from pathlib import Path
import textwrap
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas

src = Path('TasteFlow-Functional-Report.md')
out = Path('TasteFlow-Functional-Report.pdf')
text = src.read_text(encoding='utf-8')

lines = text.splitlines()

# Ensure the PDF has a simple, readable structure
c = canvas.Canvas(str(out), pagesize=A4)
width, height = A4
margin = 18 * mm
x = margin
y = height - 18 * mm

# title
c.setTitle('TasteFlow Functional and Implementation Report')
c.setAuthor('GitHub Copilot')
c.setFont('Helvetica-Bold', 18)
c.drawString(x, y, 'TasteFlow Functional and Implementation Report')
y -= 10 * mm

c.setFont('Helvetica', 10)
for idx, raw in enumerate(lines[1:], start=1):
    line = raw.rstrip()
    if not line.strip():
        y -= 4 * mm
        continue

    if line.startswith('# '):
        c.setFont('Helvetica-Bold', 14)
        line = line[2:]
    elif line.startswith('## '):
        c.setFont('Helvetica-Bold', 12)
        line = line[3:]
    elif line.startswith('### '):
        c.setFont('Helvetica-Bold', 11)
        line = line[4:]
    elif line.startswith('- '):
        c.setFont('Helvetica', 10)
        line = '• ' + line[2:]
    elif line.startswith('1. ') or line.startswith('2. ') or line.startswith('3. ') or line.startswith('4. ') or line.startswith('5. ') or line.startswith('6. ') or line.startswith('7. ') or line.startswith('8. ') or line.startswith('9. '):
        c.setFont('Helvetica', 10)
    else:
        c.setFont('Helvetica', 10)

    wrapped = textwrap.wrap(line, width=92)
    for chunk in wrapped:
        if y < 25 * mm:
            c.showPage()
            y = height - 18 * mm
            c.setFont('Helvetica', 10)
        c.drawString(x, y, chunk)
        y -= 5 * mm

    y -= 2 * mm

c.save()
print(f'PDF created: {out.resolve()}')
