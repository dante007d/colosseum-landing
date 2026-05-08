import sys

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove the Wreath component definition
import re
content = re.sub(r'const Wreath = .*?};\n', '', content, flags=re.DOTALL)

# 2. Remove all Wreath instances from the JSX
content = re.sub(r'<Wreath .*?\/>', '', content)

# 3. Clean up the hero title layout (remove the flex wrapper I added for wreaths)
content = content.replace(
    '<div className="flex items-center justify-center gap-4 md:gap-12 mb-6">\n            \n            <h1',
    '<h1'
)
content = content.replace(
    'COLOSSEUM\n            </h1>\n            \n          </div>',
    'COLOSSEUM\n            </h1>'
)

# 4. Remove wreath from the interaction trigger
content = content.replace('<Wreath className="w-16 h-16 text-gold/30 mx-auto mb-6" />', '')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
