import argparse
import json
import logging
import os
import urllib
# noinspection PyCompatibility
import urlparse
from collections import OrderedDict

import ontospy
import requests
import unicodecsv as csv

# global namespace lookup
with open('context.json', 'r') as c:
    namespaces = json.load(c)['@context']


def get_uri(uri):
    """
    Get text from a URI
    :param uri: uri (can be file://, or http(s)://
    :return: text or None
    """
    if uri.startswith('file://'):
        f = urllib.url2pathname(urlparse.urlparse(uri).path)
        if os.access(f, os.R_OK):
            with open(f) as file_f:
                text = file_f.read()
                return text
        else:
            logging.warning('WARNING Cannot read: %s', uri)
            return None
    elif uri.startswith(('http://', 'https://')):
        r = requests.get(uri)
        if r.status_code == requests.codes.ok:
            text = r.text
            return text
        else:
            logging.warning('WARNING Cannot retrieve: %s', uri)
            return None
    else:
        logging.warning('WARNING Do not recognise requests of type: %s', uri)
        return None


def qname_to_id(val):
    """
    Turns a qname into a URI.

    Crude string matching to check if it looks like a qname, and looks up the prefix in global dict of namespaces.
    :param val: String, e.g. of form prefix:local
    :return: string of form http://www.example.com/namespace#local
    """
    if val:
        if ':' in val and 'http://' not in val:
            ns, value = val.split(':')
            # noinspection PyBroadException
            if ns in namespaces:
                ns_uri = namespaces[ns]
            else:
                ns_uri = None
            if ns_uri and value:
                return ''.join([ns_uri, value])
            else:
                return None
        else:
            return None
    else:
        return None


def generate_expanded(value):
    """
    Generate an full URI for a value, if it can be identified in the namespaces.

    :param value:
    :return: uri or none
    """
    field_uri = qname_to_id(value)
    if field_uri:
        return field_uri
    else:
        return None


def expand_dct(dct, sanitise=True, pair=False):
    """
    Expand an entire dict with id and label pairs.
    :param dct: dictionary
    :param sanitise: convert : to _ for Jinja
    :param pair: convert fields in id label pairs.
    :return: expanded dictionary
    """
    for k, v in dct.items():
        expanded = generate_expanded(value=v)
        if k == 'crowds:uiInputOptions':
            # json.dumps([x.strip() for x in dct['crowds:uiInputOptions'].split(';')])
            if ';' in dct[k]:
                dct[k] = [opt.strip() for opt in v.split(';')]
        if expanded:
            if pair:
                # temp fix for anno studio issue
                if k in ['crowds:uiGroup', 'crowds:uiInputType', 'crowds:uiSelectorType']:
                    dct[k] = {'@id': v, 'o:label': v}
                else:
                    dct[k] = {'@id': expanded, 'o:label': v}
            else:
                dct[k] = expanded
                label_key = k + '_label'
                dct[label_key] = v
    dct = {k: v for k, v in dct.items() if v}
    if sanitise:
        return sanitise_keys(dct)
    else:
        return dct


def template_element(dct, url, elem_t, irc_t, u_t):
    """
    Create data suitable for embedded in JSON from a captute model element row in the CSV.

    :param url: base url for the server
    :param elem_t: Omeka ID for the Crowd Source Element template
    :param irc_t: Resource class for the Crowd Source Element template
    :param u_t: Omeka User ID
    :param dct: dictionary to process
    :return: parsed and expanded data as Python object
    """
    dct['@id'] = url + '/api/items/' + dct['dcterms:identifier']
    dct['o:id'] = dct['dcterms:identifier']
    dct['@type'] = ['o:Item', 'dctype:InteractiveResource']
    dct['o:is_public'] = 'true'
    dct['o:item_set'] = []
    dct['o:media'] = []
    dct['o:modified'] = {
        "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
        "@value": "2017-06-28T09:21:30+00:00"
    }
    dct['o:owner'] = {'@id': url + '/api/users/' + u_t, 'o:id': u_t}
    dct['o:resource_class'] = {'@id': url + '/api/resource_classes/' + irc_t,
                               'o:id': irc_t}
    dct['o:resource_template'] = {'@id': url + '/api/resource_templates/' + elem_t,
                                  'o:id': elem_t}
    # Set default Boolean values:
    default_booleans = {
                        'crowds:uiHidden': 'FALSE'
                        }
    for k, _ in default_booleans.items():
        if k in dct:
            if dct[k].upper() not in ['FALSE', 'TRUE']:
                dct[k] = default_booleans[k]
    default_values = {'crowds:derivedAnnoBodyPurpose': 'oa:tagging',
                      'crowds:derivedAnnoBodyType': 'oa:TextualBody',
                      'crowds:derivedAnnoBodyFormat': 'text/plain'
                      }
    for k, _ in default_values.items():
        if k in dct:
            if not dct[k]:
                dct[k] = default_values[k]
    return expand_dct(dct, sanitise=False, pair=True)


def template_group(dct, url, grp_t, irc_t, u_t, nlw_c, ida_c):
    """
    Run a group dictionary through the group Jinja template to generate JSON.

    :param grp_t:
    :param irc_t:
    :param nlw_c:
    :param ida_c:
    :param u_t:
    :param url: base url for the server
    :param dct: dictionary to process
    :return: json string from template.
    """
    dct['@id'] = url + '/api/item_sets/' + dct['dcterms:identifier']
    dct['o:id'] = dct['dcterms:identifier']
    dct['@type'] = ['o:ItemSet', 'dctype:InteractiveResource']
    dct['o:is_public'] = 'true'
    dct['o:item_set'] = []
    dct['o:media'] = []
    dct['o:modified'] = {
        "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
        "@value": "2017-06-28T09:21:30+00:00"
    }
    dct['o:owner'] = {'@id': url + '/api/users/' + u_t, 'o:id': u_t}
    dct['o:resource_class'] = {'@id': url + '/api/resource_classes/' + irc_t,
                               'o:id': irc_t}
    dct['o:resource_template'] = {'@id': url + '/api/resource_templates/' + grp_t,
                                  'o:id': grp_t}
    # Set default Boolean values:
    default_booleans = {'crowds:uiChoice': 'FALSE',
                        'crowds:uiMultiple': 'TRUE',
                        'crowds:derivedAnnoCombine': 'TRUE',
                        'crowds:derivedAnnoExternalize': 'FALSE',
                        'crowds:derivedAnnoHumanReadable': 'FALSE',
                        'crowds:derivedAnnoSerialize': 'TRUE',
                        'crowds:uiHidden': 'FALSE'
                        }
    for k, _ in default_booleans.items():
        if k in dct:
            if dct[k].upper() not in ['FALSE', 'TRUE']:
                dct[k] = default_booleans[k]
    default_values = {'crowds:derivedAnnoBodyPurpose': 'oa:tagging',
                      'crowds:derivedAnnoBodyType': 'oa:TextualBody',
                      'crowds:derivedAnnoMotivatedBy': 'oa:tagging',
                      'crowds:uiComponent': 'resource',
                      'crowds:uiGroup': 'madoc:form',
                      'crowds:derivedAnnoBodyFormat': 'text/plain'
                      }
    for k, _ in default_values.items():
        if k in dct:
            if not dct[k]:
                dct[k] = default_values[k]
    if nlw_c:
        with open('nlw_context.json', 'r') as context_file:
            dct['@context'] = json.load(context_file)['@context']
    elif ida_c:
        with open('ida_context.json', 'r') as context_file:
            dct['@context'] = json.load(context_file)['@context']
    else:
        with open('nlw_context.json', 'r') as context_file:
            dct['@context'] = json.load(context_file)['@context']
    return expand_dct(dct, sanitise=False, pair=True)


def sanitise_keys(d):
    """
    Strip all of the colons out of the key names
    :param d:
    :return: dict
    """
    new_d = {}
    for k, v in d.items():
        new_d[k.replace(':', '_')] = v
    return new_d


def process_group(top_level, groupss, elemss, url_b, group_t, element_t, ir_c, u):
    """
    Recursively process a capture model group.

    :param url_b: base url for the server
    :param top_level: top level group
    :param groupss: group level rows
    :param elemss: element level rows
    :param u: Omeka User ID
    :param group_t: ID for group resource template
    :param element_t: ID for element resource template.
    :param ir_c: ID for the Interactive Resource class
    :return: top_level row with parts
    """
    parts = top_level['dcterms:hasPart'].split(';')
    group_parts = [x for x in groupss if x['dcterms:identifier'] in parts]
    element_parts = [x for x in elemss if x['dcterms:identifier'] in parts]
    if group_parts:
        top_level['dcterms:hasPart'] = [
            template_group(process_group(top_level=g, groupss=groupss, elemss=elemss, url_b=url_b,
                                         group_t=group_t, element_t=element_t, ir_c=ir_c, u=u
                                         ),
                           url=url_b, grp_t=group_t, irc_t=ir_c, u_t=u,
                           ida_c=False, nlw_c=False)
            for g in group_parts]
    elif element_parts:
        top_level['dcterms:hasPart'] = [template_element(item, url=url_b, elem_t=element_t,
                                                         irc_t=ir_c,
                                                         u_t=u)
                                        for item in element_parts]
    else:
        pass
    return top_level


def csv_load(csv_file, url_base, group, element, irclass, user, top_index='1', delimiter='|', ida_context=False):
    """
    Load a CSV file and return formatted JSON. Defaults to assuming a pipe-delimited CSV file.

    top_index sets the numbered row in the CSV (using the running_no column) to treat as the top-level group.

    N.B. does no validation of the input.

    :param ida_context:
    :param csv_file: the CSV file to open.
    :param url_base: the base for the Omeka server, e.g. 'http://nlw-omeka.digtest.co.uk'
    :param group: the Omeka ID number for the Crowd Source Group resource template
    :param element: the Omeka ID number for the Crowd Source Element resource template
    :param top_index: numbered row to treat as the top level group in the capture model
    :param user: Omeka User ID.
    :param irclass: Omeka ID for the Interactive resource class
    :param delimiter: the delimiter for the CSV, defaults to pipe '|'
    :return: json suitable for import into Omeka via the capture model importer module.
    """
    if ida_context:
        nlw_context = False
    else:
        nlw_context = True
    with open(csv_file, 'r') as csv_in:
        rows = list(csv.DictReader(csv_in, delimiter=delimiter))
        groups = [row for row in rows if row['dcterms:type'] == 'madoc:group']
        elements = [row for row in rows if row['dcterms:type'] == 'madoc:element']
        top = [t for t in groups if t['dcterms:identifier'] == top_index][0]
        group_dict = template_group((process_group(top_level=top, groupss=groups, elemss=elements, url_b=url_base,
                                                   group_t=group, element_t=element, ir_c=irclass, u=user)),
                                    nlw_c=nlw_context, ida_c=ida_context,
                                    url=url_base, grp_t=group, irc_t=irclass, u_t=user)
        # fix case on Booleans via crude string replace in JSON
        return json.loads(json.dumps(group_dict).replace('TRUE', 'True').replace('FALSE', 'False'))


def csv_gen_vocab(csv_file, delimiter='|'):
    """
    Generate an empty CSV file for creating capture model using the Crowds RDF source. Will parse and append all of the
    vocab URIs it finds in the
    :param csv_file: filename to write to
    :param delimiter: delimiter for CSV, defaults to pipe '|'.
    """
    all_fields = OrderedDict([
        ('dcterms:identifier', None),
        ('dcterms:type', None),
        ('dcterms:hasPart', None),
        ('dcterms:title', None),
        ('rdfs:label', None),
        ('dcterms:description', None),
        ('dcterms:conformsTo', None),
        ('rdfs:range', None)],
    )
    crowds = ontospy.Ontospy(
        "https://raw.githubusercontent.com/digirati-co-uk/annotation-vocab/master/crowds.rdf")
    for p in crowds.properties:
        all_fields[p.qname] = None
    with open(csv_file, 'w') as csv_out:
        dw = csv.DictWriter(
            csv_out, delimiter=delimiter, fieldnames=all_fields)
        dw.writeheader()


def main():
    """
    Initialise logging.

    Parse args.

    Write JSON.

    For example:

        python gen_json.py -i monkeys.csv -o monkeys.json -b http://www.example.com/monkeys

    Or, to generate the WW1 capture model, as JSON:

        python gen_json.py -i ww1.csv -o ww1.json -b http://nlw-omeka.digtest.co.uk -t 2 -c 27 -g 5 -e 4 -u 3

        python gen_json.py -i gle.csv -o gle.json -u 2 -t 1 -c 27 -g 5 -e 4 -u 3

    IDA model:

        python gen_json.py -i ida_master.csv -o ida_master.json -u 2 -t 1 -c 27 -g 3 -e 1

    :return: None
    """
    logging.basicConfig(filename='capture_model.log', level=logging.DEBUG)
    parser = argparse.ArgumentParser(description='Simple CSV to JSON tool for annotation studio capture models.')
    parser.add_argument('-i', '--input', help='Input CSV file name', required=True)
    parser.add_argument('-o', '--output', help='Output JSON file name', required=True)
    parser.add_argument('-b', '--url_base', help='Base url for the Omeka instance', required=False)
    parser.add_argument('-t', '--top_index', help='Numbered element to treat as the top level group', required=False)
    parser.add_argument('-g', '--group_id', help='ID for the Crowd Source Group resource template', required=False)
    parser.add_argument('-e', '--element_id', help='ID for the Crowd Source Element resource template', required=False)
    parser.add_argument('-c', '--irclass', help='ID for the Interactive Resource class', required=False)
    parser.add_argument('-u', '--user', help='Omeka User ID for the Owner', required=False)
    parser.add_argument('-x', '--context', help='IDA Context', required=False)
    args = parser.parse_args()
    if not args.url_base:
        args.url_base = 'http://nlw-omeka.digtest.co.uk'
    if not args.irclass:
        args.irclass = 27
    if not args.group_id:
        args.group_id = 5
    if not args.element_id:
        args.element_id = 4
    if not args.user:
        args.user = 2
    if not args.context:
        args.conext = False
    if args.top_index:
        js = csv_load(csv_file=args.input, url_base=args.url_base, top_index=args.top_index, group=args.group_id,
                      element=args.element_id, irclass=args.irclass, user=args.user, ida_context=args.context)
    else:
        js = csv_load(csv_file=args.input, url_base=args.url_base, group=args.group_id,
                      element=args.element_id, irclass=args.irclass, user=args.user, ida_context=args.context)
    if js:
        with open(args.output, 'w') as o:
            json.dump(js, o, indent=4, sort_keys=True)


if __name__ == "__main__":
    main()
