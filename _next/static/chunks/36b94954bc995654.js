(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"warnOnce",{enumerable:!0,get:function(){return r}});let r=e=>{}},67882,e=>{"use strict";var t=e.i(43476),a=e.i(71645);let r=[{subject:"Absence from FOS lecture",body:`Dear Ryan,

I noticed you were absent from the last few FOS‑1101S lectures and tutorials. Regular attendance is important for your learning and for your FOS participation grade.

Please let me know if there are any issues and ensure you catch up on the material.

Regards,
Prof. Philo Tan
FOS School of Computing`,reply:`Dear Prof Tan,

Thank you for your email and your concern. I apologise for missing the recent FOS‑1101S lectures and tutorials. I have broken my leg, my dog ate my homework, my laptop exploded but I am able to attend class again.

If there are any specific topics you recommend I focus on first, I would appreciate your guidance.

Best regards,
Ryan`},{subject:"Follow‑up on FOS tutorial attendance",body:`Hi Ryan,

You have missed several FOS‑2100 tutorials and labs. This will affect both your project work and your continuous FOS score.

Please reply to let me know what is happening and how you plan to catch up.

Best,
Prof. Philo Tan
FOS Computing`,reply:`Hi Prof Tan,

Thank you for following up. I am really sorry for my poor attendance for FOS‑2100. I have been forced to carry in group projects and hackathons recently.

I am now going through the tutorial solutions on the FOS Portal and revising the lab exercises. I will attend the next tutorial and lab and keep up with the schedule from here.

Thank you for your understanding.

Sincerely,
Ryan`},{subject:"[Action Needed] Repeated absence from FOS‑9999",body:`Dear Mr Tan,

Our system has detected multiple absences from FOS‑9999: Advanced Surviving Lectures. Continued absence may affect your eligibility for the Final Ultimate FOS Assessment.

Please reply to confirm that you are still enrolled, still conscious, and still in possession of a working FOS‑ID card.

Yours faithfully,
Prof. Philo Tan
FOS Department of Student Awakening`,reply:`Dear Prof Tan,

Thank you for the very dramatic reminder. I can confirm that I am still enrolled, still conscious most of the time, and my FOS‑ID card only fails to scan on alternate Tuesdays.

I apologise for vanishing from FOS‑9999. I have been buried under group projects, surprise quizzes, and mysterious FOS Portal announcements. I am now catching up using the lecture scrolls, tutorial scrolls, and the unofficial FOS survival notes shared by my classmates.

I will return to your lectures, tutorials, and labs, and do my best to appear awake during at least half of them.

Thank you for your patience.

Best regards,
Ryan`}];e.s(["default",0,({onSuccess:e})=>{let[s,o]=(0,a.useState)(0);(0,a.useEffect)(()=>{o(Math.floor(Math.random()*r.length))},[]);let n=r[s],l=(0,a.useMemo)(()=>n.reply.split(/(\s+)/).filter(e=>e.length>0),[n.reply]),[i,c]=(0,a.useState)(0),[u,d]=(0,a.useState)(!1),y=(0,a.useRef)(null),h=(0,a.useMemo)(()=>l.slice(0,i).join(""),[l,i]);(0,a.useEffect)(()=>{i>=l.length&&!u&&d(!0)},[i,l.length,u]),(0,a.useEffect)(()=>{y.current&&(y.current.scrollTop=y.current.scrollHeight)},[h]);let p=e=>{u||c(t=>Math.min(l.length,t+e))};return(0,t.jsxs)("div",{className:"flex flex-col items-center gap-4",children:[(0,t.jsx)("h1",{className:"text-black font-bold text-center",children:"Reply to your FOS professor's email"}),(0,t.jsxs)("div",{className:"w-110 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden text-sm",children:[(0,t.jsxs)("div",{className:"bg-gray-100 border-b border-gray-200 px-4 py-2",children:[(0,t.jsxs)("div",{className:"text-[11px] text-gray-600",children:["From:"," ",(0,t.jsx)("span",{className:"font-semibold text-black",children:"philo.tan@u.fos.edu"})]}),(0,t.jsxs)("div",{className:"text-[11px] text-gray-600",children:["To:"," ",(0,t.jsx)("span",{className:"font-semibold text-black",children:"ryan.tan@u.fos.edu"})]}),(0,t.jsxs)("div",{className:"text-[11px] text-gray-600",children:["Subject:"," ",(0,t.jsx)("span",{className:"font-semibold text-black",children:n.subject})]})]}),(0,t.jsx)("div",{className:"px-4 py-3 border-b border-gray-200 bg-white",children:n.body.split("\n").map((e,a)=>(0,t.jsx)("p",{className:"text-xs text-gray-700 mb-2",children:e},a))}),(0,t.jsxs)("div",{className:"px-4 py-3 bg-gray-50 flex flex-col gap-2",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("span",{className:"text-[11px] text-gray-600",children:["Replying as ",(0,t.jsx)("span",{className:"font-semibold",children:"Ryan"})]}),(0,t.jsx)("span",{className:"text-[10px] text-gray-400",children:"Spam your keyboard to auto‑write the reply"})]}),(0,t.jsx)("textarea",{ref:y,className:"w-full h-25 border border-gray-300 rounded-md px-2 py-1 text-xs text-black bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500",value:h,onChange:e=>{u||p(4)},onKeyDown:e=>{u||(e.preventDefault(),p(3))},placeholder:"Start typing your reply..."}),(0,t.jsxs)("div",{className:"flex justify-between items-center mt-1",children:[(0,t.jsx)("span",{className:"text-[11px] text-gray-500",children:u?"Reply complete. Ready to send.":"Keep typing to finish the reply..."}),(0,t.jsx)("button",{type:"button",onClick:()=>{u&&e?.()},disabled:!u,className:`px-3 py-1 rounded-full text-[11px] font-semibold ${u?"bg-blue-600 text-white hover:bg-blue-700":"bg-gray-300 text-gray-500 cursor-not-allowed"}`,children:"Send"})]})]})]}),(0,t.jsx)("p",{className:"text-gray-500 text-[11px] max-w-xs text-center",children:"Mash your keyboard to auto‑write an email reply before you get expelled."})]})}])}]);