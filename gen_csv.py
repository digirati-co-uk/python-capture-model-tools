import json
from collections import OrderedDict

import ontospy
import requests
from pyld import jsonld

import unicodecsv as csv

# global context document
with open('context.json', 'r') as context_file:
    master_context = json.load(context_file)
    del(master_context['@context']['dct'])  # remove unwanted alternative dcterms 'dct' prefix
    del(master_context['@context']['dcterm'])  # unwanted alternative dcterms 'dcterm' prefix
    del(master_context['@context']['sdo'])  # unwanted alternative schema.org prefix
    del(master_context['@context']['sorg'])  # unwanted alternative schema.org prefix


def initialise():
    """
    Return an OrderedDict comprising the list of fields in the CSV rows.
    :return: OrderedDict of fields
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
    return all_fields


def get_model(uri):
    """
    Return a capture model as ordered JSON object
    :param uri: URI for capture model
    :return: ordered JSON object
    """
    if uri:
        r = requests.get(uri)
        if r.status_code == requests.codes.ok:
            source = r.text
            model = json.loads(source, object_pairs_hook=OrderedDict)
            return model
        else:
            return None
    else:
        return None


def parse_field(field_key, field_value, dw):
    """
    Return a field as a key/value pair, normalising the keys to qnames, and the value to a single value,
    based on the o:id, @id and o:label, in that order.

    Return None, None for fields that don't fit this pattern.
    :param field_value:
    :param field_key:
    :return:
    """
    # if field_key == u'o:id':
    #     return 'dcterms:identifier', field_value  # don't try to compact @ids
    if field_key == '@id':
        return None, None
    # compact using master context to reduce to qnames
    ck = jsonld.compact({field_key: field_value}, master_context)
    del (ck['@context'])  # remove the context
    if ck:
        for k, v in ck.items():
            if k == 'dcterms:hasPart':
                for z in v:
                    parse_expanded([z], dw)
                return k, ';'.join([y['dcterms:identifier'] for y in v])
            if isinstance(v, dict):
                for x in ['o:id', '@id', 'o:label']:
                    if x in v:
                        return k, v[x]
                return None, None
            else:
                return k, v


def parse_expanded(model, dw):
    """
    Parse and expanded capture model and generate dicts suitable for writing to CSV rows.
    :param model: expanded JSON-LD
    :return: Python object mapped to CSV row headings
    """
    master_dict = initialise()
    for item in model:
        for k, v in item.items():
            if k and v:
                parsed_key, parsed_value = parse_field(k, v, dw)
                if parsed_key in master_dict.keys():
                    master_dict[parsed_key] = parsed_value
        print(json.dumps(master_dict, indent=2))
        dw.writerow(master_dict)


def main():
    """
    Test/working function
    :return:
    """
    all_fields = initialise()  # ordered dict of field names in CSV
    csv_file = 'test_out.csv'
    with open(csv_file, 'w') as csv_out:  # open CSV and write header row
        dw = csv.DictWriter(
            csv_out, delimiter='|', fieldnames=all_fields)
        dw.writeheader()
        # get the capture model
        # capture_model = get_model('http://nlw-omeka.digtest.co.uk/s/site-one/annotation-studio/open/resource')
        capture_model = get_model('http://nlw-omeka.digtest.co.uk/s/war-tribunal-records/annotation-studio/open/resource')
        capture_model['@context'] = master_context  # change to context with additional namespaces
        expanded = jsonld.expand(capture_model)  # expand the JSON-LD
        parse_expanded(expanded, dw)  # recursively parse the expanded JSON-LD.


if __name__ == "__main__":
    main()
