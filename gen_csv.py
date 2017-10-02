import json
from collections import OrderedDict

import ontospy
import requests
from pyld import jsonld

# import unicodecsv as csv

# global context document
with open('context.json', 'r') as context_file:
    master_context = json.load(context_file)


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


def parse_field(field_key, field_value):
    """
    Return a field as a key/value pair, normalising the keys to qnames, and the value to a single value,
    based on the o:id, @id and o:label, in that order.

    Return None, None for fields that don't fit this pattern.
    :param field_value:
    :param field_key:
    :return:
    """
    if field_key == '@id':
        return field_value, field_value  # don't try to compact @ids
    # compact using master context to reduce to qnames
    ck = jsonld.compact({field_key: field_value}, master_context)
    del (ck['@context'])  # remove the context
    if any(ck):
        for k, v in ck.items():
            if isinstance(v, dict):
                for x in ['o:id', '@id', 'o:label']:
                    if x in v:
                        return k, v[x]
                return None, None
            else:
                return k, v


def parse_expanded(model):
    """
    Parse and expanded capture model and generate dicts suitable for writing to CSV rows.
    :param model: expanded JSON-LD
    :return: Python object mapped to CSV row headings
    """
    master_dict = initialise()
    for item in model:
        for k, v in item.items():
            if k and v:
                parsed_key, parsed_value = parse_field(k, v)
                if parsed_key in master_dict:
                    master_dict[parsed_key] = parsed_value
        return master_dict


def main():
    """
    Test/working function
    :return:
    """
    capture_model = get_model('http://nlw-omeka.digtest.co.uk/s/site-one/annotation-studio/open/resource')
    capture_model['@context'] = master_context
    expanded = jsonld.expand(capture_model)
    print(parse_expanded(expanded))


if __name__ == "__main__":
    main()
