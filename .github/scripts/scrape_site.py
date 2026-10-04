"""Print the readable text of a website (same-host pages) to stdout.

Used once to audit the current converter.sk content before the redesign.
"""
import re
import sys
import urllib.parse
import urllib.request
from html.parser import HTMLParser

START = sys.argv[1] if len(sys.argv) > 1 else "https://www.converter.sk/"
LIMIT = 40


class Extract(HTMLParser):
    def __init__(self):
        super().__init__()
        self.out, self.links, self.skip = [], [], 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ("script", "style", "noscript", "svg"):
            self.skip += 1
        if tag == "a" and a.get("href"):
            self.links.append(a["href"])
            self.out.append(f" [link:{a['href']}] ")
        if tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
            self.out.append(f"\n\n{'#' * int(tag[1])} ")
        if tag in ("p", "li", "div", "section", "br", "button", "footer", "header", "nav"):
            self.out.append("\n")
        if tag == "img" and a.get("alt"):
            self.out.append(f" [img:{a['alt']}] ")
        if tag == "meta" and a.get("name") in ("description", "keywords"):
            self.out.append(f"\n[meta {a['name']}: {a.get('content')}]\n")
        if tag == "meta" and (a.get("property") or "").startswith("og:"):
            self.out.append(f"\n[meta {a['property']}: {a.get('content')}]\n")

    def handle_endtag(self, tag):
        if tag in ("script", "style", "noscript", "svg") and self.skip:
            self.skip -= 1

    def handle_data(self, data):
        if not self.skip and data.strip():
            self.out.append(data.strip() + " ")


host = urllib.parse.urlparse(START).netloc
queue, seen = [START], set()
while queue and len(seen) < LIMIT:
    url = queue.pop(0).split("#")[0]
    if url in seen:
        continue
    seen.add(url)
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (site audit)"})
        with urllib.request.urlopen(req, timeout=20) as r:
            if "text/html" not in r.headers.get("Content-Type", ""):
                continue
            html = r.read().decode("utf-8", "replace")
    except Exception as e:  # noqa: BLE001
        print(f"\n===== {url} ERROR {e}")
        continue
    p = Extract()
    p.feed(html)
    title = re.search(r"<title>(.*?)</title>", html, re.S)
    text = re.sub(r"\n\s*\n+", "\n\n", "".join(p.out))
    print(f"\n\n===== PAGE {url} | title: {title.group(1).strip() if title else ''}\n{text.strip()}")
    for href in p.links:
        nxt = urllib.parse.urljoin(url, href).split("#")[0]
        u = urllib.parse.urlparse(nxt)
        if u.netloc == host and u.scheme.startswith("http") and not re.search(r"\.(pdf|jpg|png|webp|svg|zip)$", u.path):
            if nxt not in seen:
                queue.append(nxt)
print(f"\n===== DONE {len(seen)} pages")
