import sys

path = r'c:\Users\Hp\OneDrive\Desktop\colosseum landing\Colosseum_MMXXVI\roman-canvas-93\src\routes\index.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all occurrences of the teaser section
teaser_marker = '{/* FINAL TEASER SECTION */}'
count = content.count(teaser_marker)

if count > 1:
    print(f"Found {count} teasers. Cleaning up...")
    # Split by the marker
    parts = content.split(teaser_marker)
    # The first part is the code before any teasers
    # The last part is the teaser content + code after it
    # We want to keep everything before the first teaser, and only the LAST teaser.
    
    # Actually, it's easier to just use rfind to find the last one and keep it.
    last_idx = content.rfind(teaser_marker)
    
    # Create new content: 
    # Everything before the first teaser + only the last teaser block
    # But wait, parts[0] is everything before teaser 1.
    # We should remove everything from parts[1] to parts[count-1]
    
    # Simplified approach: remove all blocks between first marker and last marker
    first_idx = content.find(teaser_marker)
    
    # We need to be careful not to delete the main closing tags.
    # Let's just use a simpler replacement: remove the duplicates.
    
    new_content = content[:first_idx] + content[last_idx:]
    content = new_content

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
