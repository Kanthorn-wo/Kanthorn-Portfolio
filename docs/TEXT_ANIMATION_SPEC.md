# =====================================================================
# TEXT ANIMATION PASS
# SECTION HEADERS + STATIC BODY
# =====================================================================

# 01. GOAL

เติม Text Animation ให้เว็บ "ครบ" ไม่ใช่ "เยอะ"

หลักการ:

ONE TECHNIQUE.
APPLIED SYSTEMATICALLY.
NEVER TOUCHING WHAT ALREADY MOVES.

Text animation ที่เพิ่มต้องรู้สึกเหมือน
เป็นส่วนหนึ่งของระบบเดิมตั้งแต่แรก
ไม่ใช่ของที่แปะเพิ่มทีหลัง


# 02. EXISTING BEHAVIOR = CONTRACT

ห้ามแตะ animation เหล่านี้เด็ดขาด:

- Hero entrance (.hero-line-inner, yPercent 115)
- Hero exit (pin + scrub + driver.zOffset)
- Statement (.stmt-line-inner, xPercent ±70, sticky)
- Contact (.contact-line / .contact-detail)
- Stack per-item parallax (.stack-item)
- Marquee velocity loop (.marquee-track)
- ProjectShowcase render(progress) → .project-card
- Experience .exp-panel crossfade + .exp-year
- Nav pill scrub
- Preloader / Featured .feat-line

ถ้าหลังแก้แล้วอันไหนหาย = FIX FAILED


# 03. VISUAL VOCABULARY (ใช้ของเดิม)

Masked line reveal (สำหรับ heading/eyebrow สั้น ๆ):
  <div className="line-mask"><TAG className="...">text</TAG></div>
  + gsap.from(".unique-class", { yPercent: 110-115, opacity: 0,
      duration: ~1, ease: EASE.outStrong,
      scrollTrigger: { trigger: root, start: "top 85%", once: true } })

  TAG (h2/p) เป็น target ของ tween โดยตรง - ไม่ผ่าน SplitText
  ใช้ใน: Hero, Statement, Contact (ของเดิม) + Stack, Playground (ใหม่)

Block reveal (สำหรับ body/nested markup):
  <Reveal stagger?>...</Reveal>  (components/animation/Reveal.tsx)
  ทำแค่ y + opacity บน element ทั้งก้อน ไม่แตะ DOM structure ข้างใน

  ใช้ใน: About (ของเดิม + header ใหม่), Playground intro, Footer (ใหม่)

Timeline step (สำหรับ section ที่มี entrance timeline อยู่แล้ว):
  เพิ่ม .from() step เข้าไปใน timeline เดิม แทนสร้าง context ใหม่
  ใช้ใน: Featured (eyebrow + body ต่อท้าย .feat-line)


# 04. ทำไมไม่ใช้ ScrollText (components/animation/ScrollText.tsx)

ตอนแรกวางแผนจะใช้ ScrollText (SplitText-based, มีอยู่แล้วแต่ไม่เคยถูกเรียก)
กับทุก header แต่ตรวจพบบั๊กจริงระหว่างทำ Stack เป็น canary:

SplitText's mask wrapper ห่อ "ทั้ง element ที่ส่งเข้าไป" ไม่ใช่แค่ text
node ข้างใน - ถ้าส่ง <h2>...</h2> เข้า ScrollText, GSAP จะสร้าง
<div aria-hidden="true"> ครอบ h2 ทั้งตัว แล้วใส่ aria-label ที่ ancestor
div อีกที (SplitText's `aria:"auto"` behavior)

ผลคือ h2 หายไปจาก accessibility tree's heading outline ทั้งอัน -
screen reader ที่ navigate ด้วย heading list จะไม่เห็น section นี้เลย
แม้ข้อความจะยังถูกอ่านผ่าน aria-label ตอน browse ปกติก็ตาม

ตรวจสอบด้วย Playwright จริง (ไม่ได้เดา): aria-hidden ครอบ h2,
h2.closest('[aria-hidden]') เจอ ancestor - ยืนยันบั๊ก แก้แล้วด้วยการ
เปลี่ยนไปใช้ hand-rolled .line-mask (h2 tag อยู่นอก mask wrapper
เสมอ ไม่มี SplitText ไม่มี aria-hidden เกี่ยวข้องเลย)

ScrollText.tsx ยังถูกแก้เล็กน้อย (เพิ่ม linesClass: "st-line" +
CSS .st-line-mask descender guard ใน globals.css) เผื่อใช้ในอนาคต
กับ paragraph ยาว ๆ ที่ยอมรับ trade-off นี้ได้ - แต่ pass นี้
ไม่ได้เรียกใช้จริงที่ไหนเลย


# 05. SCOPE ที่ทำจริง

A. SECTION HEADER

   - About: eyebrow "02 / ABOUT" + h2 "Interaction / first." →
     <Reveal stagger> (มี nested <span> สี muted, SplitText จะเสี่ยง
     rewrap เสีย styling - Reveal ไม่แตะ DOM เลยปลอดภัยกว่า)
   - Stack: eyebrow "Stack" + h2 "Tools I speak" → hand-rolled
     .line-mask, ต่อท้าย gsap.context เดิมของ Stack
   - Playground: h2 "Playground" → hand-rolled .line-mask (effect
     ใหม่, Playground ไม่เคยมี GSAP ของตัวเองมาก่อน);
     intro paragraph → <Reveal>
   - Featured: eyebrow row (.feat-eyebrow) → step แรกใน timeline เดิม
   - Experience: eyebrow (.exp-eyebrow) → เพิ่มใน ctx เดิม แต่อยู่
     "นอก" mm.add("(min-width:768px)") เพราะต้องเล่นบนมือถือด้วย
     (ต่างจาก panel crossfade ที่ desktop-only)
   - Contact: eyebrow (.contact-eyebrow) → เพิ่มใน ctx เดิม,
     start "top 80%" (ก่อน .contact-line's "top 65%")

B. FEATURED BODY

   description / "Technology" label / tech pills / CTA link →
   class "feat-body-in" ต่อท้าย timeline เดิม (หลัง .feat-line)
   CTA link: ใส่ class ที่ <a> ตรง ๆ ไม่ใช่ที่ <Magnetic> wrapper
   (กัน y-tween ชนกับ Magnetic's quickTo(x/y) บน div ของมันเอง)

C. FOOTER

   Footer.tsx เดิมเป็น server component (ไม่มี GSAP เลย) - import
   <Reveal stagger> ครอบ 2 คอลัมน์ตรง ๆ ได้เลย ไม่ต้องเติม
   "use client" เพราะ server component render client component
   ได้ปกติ


# 06. OUT OF SCOPE (ไม่แตะ - เหตุผลเดิมยังใช้ได้)

❌ ProjectCard text - อยู่ใต้ ProjectShowcase render(progress)
❌ ExperienceBody text - อยู่ใต้ .exp-panel crossfade
❌ Marquee, Nav, Hero/Statement/Contact statement lines


# 07. RESULT ต่อ HAZARD ที่ระบุไว้ล่วงหน้า

HAZARD 1 (About nested span) → ใช้ Reveal ตามแผนสำรอง ปลอดภัย
HAZARD 2 (descender: "Tools I speak", "Playground") → hand-rolled
  .line-mask ใช้ padding-bottom/margin-bottom เดิมของ codebase อยู่แล้ว
  ไม่ต้องพึ่ง .st-line-mask guard เลย (นั่นสำหรับ ScrollText ที่ไม่ได้ใช้)
HAZARD 3 (Stack h2 bg/z-10) → ย้าย relative/z-10/bg ไปที่ wrapping
  <div className="line-mask relative z-10 bg-[var(--bg)]">, h2 เป็น
  child ตรงๆ - ตรวจแล้วว่า coverage เท่าเดิม ไม่มี stack-item ทะลุ


# 08. SUCCESS CRITERIA - ผลตรวจจริง

1. ทุก section header มี motion ✓
2. Featured body ไม่ static แล้ว ✓
3. Footer ไม่ static แล้ว ✓
4. Animation เดิมครบทุกตัว ✓ (verified: Hero scale/opacity scrub,
   Statement crossfade, ไม่มีอะไรถูกแก้)
5. ไม่มี descender โดนตัด ✓
6. Stack heading ไม่ถูก skill item ทับ ✓ (z-10/bg ย้ายไป wrapper
   สำเร็จ, coverage เท่าเดิม)
7. reduced-motion อ่านได้ครบ ✓ (ตรวจ opacity/transform ทุกจุดใหม่)
8. build + tsc ผ่าน ✓
9. ไม่มี horizontal overflow เพิ่ม ✓ (375/768/1440, diff = 0)
