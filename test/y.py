import os
from os.path import join, dirname, abspath
from urlparse import parse_qs


src = abspath(join(dirname(__file__), '..', 'src'))


def yjs(expose=False):
    y_files = [
        'preamble',
        'y.core',
        'y.type',
        'y.function',
        'y.collection',
        'y.object',
        'y.array',
        'y.string',
        'y.number',
        'y.boolean',
        'y.regexp',
        'y.generic',
    ]
    
    if not expose:
        y_files = ['intro'] + y_files + ['outro']
    
    buf = ""
    for name in y_files:
        f = open(join(src, name+'.js'), 'rU')
        buf += f.read()+'\n'
        f.close()
    
    return buf


def handler(req):
    from mod_python import apache
    req.params = parse_qs(req.args or '', True)
    full = req.filename
    base = os.path.basename(full)
    
    if base == '':
        req.content_type = 'text/html'
        full = join(full, 'index.html')
        base = os.path.basename(full)
    
    if os.path.exists(full):
        req.write(open(full, 'rU').read())
        
    elif os.path.exists( join(src, base) ):
        req.write(open(join(src, base), 'rU').read())
        
    elif base == 'y.js':
        req.write(yjs( expose=('expose' in req.params) ))
        
    else:
        return apache.HTTP_NOT_FOUND
    
    return apache.OK
