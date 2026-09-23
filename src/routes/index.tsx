import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  ArrowRight, BarChart3, CalendarDays, Check, CheckCircle2, ChevronRight,
  Clipboard, Clock3, Copy, FileText, Home, Info, LayoutList, LoaderCircle,
  Mail, Menu, Plus, RotateCcw, Settings, Sparkles, Trash2, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "AI Workplace Productivity Assistant" },
    { name: "description", content: "Draft emails, summarize meetings, and plan focused work with responsible AI assistance." },
    { property: "og:title", content: "AI Workplace Productivity Assistant" },
    { property: "og:description", content: "Draft emails, summarize meetings, and plan focused work with responsible AI assistance." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: WorkplaceApp,
});

type View = "Dashboard" | "Email Generator" | "Meeting Summarizer" | "Task Planner" | "Settings";
const DISCLAIMER = "AI-generated content may contain errors. Review and verify outputs before using them for workplace decisions or communication. Do not enter confidential or sensitive information.";
const nav = [
  { name: "Dashboard" as View, icon: Home }, { name: "Email Generator" as View, icon: Mail },
  { name: "Meeting Summarizer" as View, icon: FileText }, { name: "Task Planner" as View, icon: LayoutList },
  { name: "Settings" as View, icon: Settings },
];

function WorkplaceApp() {
  const [view, setView] = useState<View>("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = (next: View) => { setView(next); setMobileOpen(false); };
  return <div className="min-h-screen bg-background text-foreground">
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-200 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex h-20 items-center justify-between border-b border-sidebar-border px-5">
        <button onClick={() => navigate("Dashboard")} className="flex min-w-0 items-center gap-3 text-left" aria-label="Go to dashboard">
          <span className="grid size-9 shrink-0 place-items-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground"><Sparkles className="size-5" /></span>
          <span className="min-w-0"><span className="block font-display text-sm font-extrabold leading-tight">AI Workplace</span><span className="block text-xs text-sidebar-foreground/60">Productivity Assistant</span></span>
        </button>
        <Button variant="ghost" size="icon" className="text-sidebar-foreground lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X /></Button>
      </div>
      <nav className="space-y-1 px-3 py-6" aria-label="Main navigation">{nav.map(({name, icon: Icon}) => <button key={name} onClick={() => navigate(name)} className={`flex h-11 w-full items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors ${view === name ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`}><Icon className="size-4.5" />{name}</button>)}</nav>
      <div className="absolute bottom-0 left-0 right-0 border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 rounded-md bg-sidebar-accent p-3"><div className="grid size-8 place-items-center rounded-full bg-sidebar-primary font-display text-xs font-bold text-sidebar-primary-foreground">TC</div><div><p className="text-xs font-semibold">Tebogo Chabalala</p><p className="text-[11px] text-sidebar-foreground/55">Professional plan</p></div></div>
      </div>
    </aside>
    {mobileOpen && <button className="fixed inset-0 z-30 bg-foreground/30 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />}
    <main className="min-h-screen lg:ml-64">
      <header className="sticky top-0 z-20 grid h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6 lg:px-8">
        <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu /></Button>
        <div className="min-w-0"><p className="truncate font-display text-base font-bold">{view}</p><p className="hidden text-xs text-muted-foreground sm:block">Work smarter, stay focused.</p></div>
        <div className="flex items-center gap-2"><span className="hidden items-center gap-2 text-xs font-medium text-muted-foreground sm:flex"><span className="size-2 rounded-full bg-success" />All systems ready</span><div className="grid size-9 place-items-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">TC</div></div>
      </header>
      <div className="mx-auto max-w-[1400px] p-4 sm:p-6 lg:p-8">
        {view === "Dashboard" && <Dashboard navigate={navigate} />}
        {view === "Email Generator" && <EmailTool />}
        {view === "Meeting Summarizer" && <MeetingTool />}
        {view === "Task Planner" && <TaskPlanner />}
        {view === "Settings" && <SettingsPanel />}
      </div>
    </main>
  </div>;
}

function PageIntro({eyebrow, title, body}: {eyebrow: string; title: string; body: string}) {
  return <div className="mb-7"><p className="mb-2 text-xs font-bold uppercase tracking-widest text-accent-foreground">{eyebrow}</p><h1 className="font-display text-2xl font-extrabold sm:text-3xl">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{body}</p></div>;
}
function Dashboard({navigate}: {navigate: (v: View) => void}) {
  const tools = [
    { title:"Write a professional email", desc:"Create clear, polished messages in seconds.", icon:Mail, view:"Email Generator" as View },
    { title:"Summarize meeting notes", desc:"Turn long notes into focused takeaways.", icon:FileText, view:"Meeting Summarizer" as View },
    { title:"Plan your work", desc:"Build a realistic schedule around priorities.", icon:CalendarDays, view:"Task Planner" as View },
  ];
  const stats: Array<{ value: string; label: string; trend: string; icon: typeof Sparkles }> = [
    { value: "12", label: "Items generated", trend: "+18%", icon: Sparkles },
    { value: "3.8h", label: "Time saved", trend: "+24%", icon: Clock3 },
    { value: "87%", label: "Tasks completed", trend: "+9%", icon: CheckCircle2 },
  ];
  return <>
    <section className="relative overflow-hidden rounded-lg bg-secondary px-6 py-8 text-secondary-foreground sm:px-8 sm:py-10">
      <div className="relative z-10 max-w-2xl"><span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground"><Sparkles className="size-3.5" /> AI workspace</span><h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">Good morning, Tebogo.</h1><p className="mt-3 max-w-xl text-sm leading-6 text-secondary-foreground/70 sm:text-base">Ready to turn busywork into focused progress? Choose a tool and get your next task moving.</p></div>
      <div className="absolute -bottom-14 right-8 hidden size-48 rotate-12 rounded-lg border border-primary/30 bg-primary/10 lg:block" />
    </section>
    <div className="mt-8 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Quick actions</p><h2 className="mt-1 font-display text-xl font-bold">What would you like to do?</h2></div></div>
    <div className="mt-4 grid gap-4 md:grid-cols-3">{tools.map(({title,desc,icon:Icon,view}) => <button key={title} onClick={() => navigate(view)} className="surface-card group rounded-lg p-5 text-left transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md"><div className="mb-5 flex items-start justify-between"><span className="grid size-10 place-items-center rounded-md bg-accent text-accent-foreground"><Icon className="size-5" /></span><ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" /></div><h3 className="font-display text-base font-bold">{title}</h3><p className="mt-2 text-sm leading-5 text-muted-foreground">{desc}</p></button>)}</div>
    <div className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_1fr]">
      <section><div className="mb-4 flex items-center justify-between"><h2 className="font-display text-lg font-bold">Productivity snapshot</h2><span className="text-xs text-muted-foreground">This week</span></div><div className="grid gap-3 sm:grid-cols-3">{stats.map(({ value, label, trend, icon: Icon }) => <div key={label} className="surface-card rounded-lg p-5"><div className="flex items-center justify-between"><Icon className="size-4 text-accent-foreground" /><span className="text-xs font-semibold text-success">{trend}</span></div><p className="mt-5 font-display text-2xl font-extrabold">{value}</p><p className="mt-1 text-xs text-muted-foreground">{label}</p></div>)}</div></section>
      <section><div className="mb-4 flex items-center justify-between"><h2 className="font-display text-lg font-bold">Recent activity</h2><button className="text-xs font-semibold text-accent-foreground">View all</button></div><div className="surface-card divide-y divide-border rounded-lg">{[["Project update email","Email","12 min ago"],["Weekly team sync","Summary","Yesterday"],["Thursday focus plan","Plan","2 days ago"]].map(([title,type,time]) => <div key={title} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-4"><span className="grid size-8 place-items-center rounded-md bg-muted"><FileText className="size-4" /></span><div className="min-w-0"><p className="truncate text-sm font-semibold">{title}</p><p className="text-xs text-muted-foreground">{type}</p></div><span className="text-[11px] text-muted-foreground">{time}</span></div>)}</div></section>
    </div><Disclaimer />
  </>;
}

function ToolLayout({intro, input, output}: {intro: React.ReactNode; input: React.ReactNode; output: React.ReactNode}) { return <>{intro}<div className="grid gap-6 xl:grid-cols-2"><section className="surface-card rounded-lg p-5 sm:p-6">{input}</section><section className="surface-card min-h-[440px] rounded-lg p-5 sm:p-6">{output}</section></div><Disclaimer /></>; }
function Field({label, hint, children}: {label:string; hint?:string; children:React.ReactNode}) { return <label className="block"><span className="mb-2 flex items-center justify-between text-sm font-semibold"><span>{label}</span>{hint && <span className="text-xs font-normal text-muted-foreground">{hint}</span>}</span>{children}</label>; }
function ToolHeader({title, actions}: {title:string; actions?:React.ReactNode}) { return <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border pb-4"><h2 className="font-display font-bold">{title}</h2>{actions}</div>; }
function LoadingState({label}: {label:string}) { return <div className="grid min-h-[330px] place-items-center text-center"><div><LoaderCircle className="mx-auto size-8 animate-spin text-accent-foreground" /><p className="mt-4 text-sm font-semibold">{label}</p><p className="mt-1 text-xs text-muted-foreground">Structuring a useful response…</p></div></div>; }
function EmptyState({icon:Icon, title, text}: {icon: typeof Mail; title:string; text:string}) { return <div className="grid min-h-[330px] place-items-center text-center"><div className="max-w-xs"><span className="mx-auto grid size-12 place-items-center rounded-lg bg-muted text-muted-foreground"><Icon /></span><h3 className="mt-4 text-sm font-bold">{title}</h3><p className="mt-2 text-xs leading-5 text-muted-foreground">{text}</p></div></div>; }
function ActionButtons({onCopy,onRegenerate,onClear}: {onCopy:()=>void;onRegenerate:()=>void;onClear:()=>void}) { return <div className="flex items-center gap-1"><Button variant="ghost" size="icon" onClick={onCopy} title="Copy output"><Copy /></Button><Button variant="ghost" size="icon" onClick={onRegenerate} title="Regenerate"><RotateCcw /></Button><Button variant="ghost" size="icon" onClick={onClear} title="Clear output"><Trash2 /></Button></div>; }
const delay = (fn:()=>void) => window.setTimeout(fn, 900);
const copyText = async (text:string) => { if (!text) return; await navigator.clipboard.writeText(text); toast.success("Copied to clipboard"); };

function EmailTool() {
  const [recipient,setRecipient]=useState(""); const [subject,setSubject]=useState(""); const [context,setContext]=useState(""); const [tone,setTone]=useState("Formal"); const [output,setOutput]=useState(""); const [loading,setLoading]=useState(false);
  const generate=()=>{ if(!recipient.trim()||!context.trim()){toast.error("Add a recipient and message context first");return;} setLoading(true); delay(()=>{setOutput(`Subject: ${subject || "Following up on our discussion"}\n\nDear ${recipient},\n\nI hope you’re doing well. ${context.trim()}\n\nPlease let me know if you have any questions or if there is anything further I can provide. I look forward to your response.\n\nKind regards,\nTebogo`);setLoading(false);toast.success("Professional email generated");});};
  return <ToolLayout intro={<PageIntro eyebrow="Communication" title="Smart Email Generator" body="Turn a few details into a clear, professional email you can review and refine." />} input={<><ToolHeader title="Email details"/><div className="space-y-5"><Field label="Recipient" hint="Required"><Input value={recipient} onChange={e=>setRecipient(e.target.value)} placeholder="e.g. Sarah or the project team" /></Field><Field label="Subject"><Input value={subject} onChange={e=>setSubject(e.target.value)} placeholder="What is this email about?" /></Field><Field label="Tone"><div className="grid grid-cols-3 gap-2">{["Formal","Friendly","Persuasive"].map(t=><Button key={t} type="button" variant={tone===t?"default":"outline"} onClick={()=>setTone(t)}>{tone===t&&<Check/>}{t}</Button>)}</div></Field><Field label="Context" hint="Required"><Textarea value={context} onChange={e=>setContext(e.target.value)} className="min-h-40 resize-none" placeholder="Describe the purpose, key details, and desired outcome…" /></Field><Button className="h-11 w-full" onClick={generate} disabled={loading}>{loading?<LoaderCircle className="animate-spin"/>:<Sparkles/>}Generate email</Button><p className="text-center text-[11px] text-muted-foreground">Using {tone.toLowerCase()} tone • Structured workplace format</p></div></>} output={<><ToolHeader title="Generated email" actions={output&&<ActionButtons onCopy={()=>copyText(output)} onRegenerate={generate} onClear={()=>setOutput("")} />}/>{loading?<LoadingState label="Drafting your email"/>:output?<Textarea value={output} onChange={e=>setOutput(e.target.value)} className="min-h-[350px] resize-none border-0 p-0 text-sm leading-7 shadow-none focus-visible:ring-0"/>:<EmptyState icon={Mail} title="Your email will appear here" text="Complete the details and choose Generate email. The result remains fully editable."/>}</>} />;
}

function MeetingTool(){
  const [notes,setNotes]=useState(""); const [loading,setLoading]=useState(false); const [parts,setParts]=useState({summary:"",decisions:"",actions:"",deadlines:""});
  const generate=()=>{if(notes.trim().length<40){toast.error("Add at least a few sentences of meeting notes");return;}setLoading(true);delay(()=>{setParts({summary:"The team reviewed current project progress, aligned on delivery priorities, and identified the remaining work needed before launch. Stakeholders agreed to maintain the current scope and improve status visibility.",decisions:"• Keep the planned launch date\n• Freeze non-essential scope changes\n• Share progress updates twice weekly",actions:"• Tebogo: circulate the updated project brief\n• Project team: complete final quality checks\n• Operations: confirm the launch checklist",deadlines:"• Updated brief — Tomorrow, 12:00\n• Quality checks — Friday, 15:00\n• Launch checklist — Friday, 17:00"});setLoading(false);toast.success("Meeting notes summarized");});};
  const all=Object.values(parts).join("\n\n"); const clear=()=>setParts({summary:"",decisions:"",actions:"",deadlines:""});
  const sections: Array<{label:string; key:keyof typeof parts; icon:typeof FileText}> = [{label:"Summary",key:"summary",icon:FileText},{label:"Key decisions",key:"decisions",icon:CheckCircle2},{label:"Action items",key:"actions",icon:Clipboard},{label:"Deadlines",key:"deadlines",icon:Clock3}];
  return <ToolLayout intro={<PageIntro eyebrow="Meetings" title="Meeting Notes Summarizer" body="Transform lengthy notes into decisions, owners, and deadlines your team can act on."/>} input={<><ToolHeader title="Meeting notes"/><Field label="Notes" hint={`${notes.length} characters`}><Textarea value={notes} onChange={e=>setNotes(e.target.value)} className="min-h-[330px] resize-none" placeholder="Paste your meeting transcript or notes here…"/></Field><Button className="mt-5 h-11 w-full" onClick={generate} disabled={loading}>{loading?<LoaderCircle className="animate-spin"/>:<Sparkles/>}Summarize meeting</Button></>} output={<><ToolHeader title="Structured summary" actions={all&&<ActionButtons onCopy={()=>copyText(all)} onRegenerate={generate} onClear={clear}/>}/>{loading?<LoadingState label="Finding decisions and actions"/>:all?<div className="space-y-5">{sections.map(({label,key,icon:Icon})=><div key={key}><div className="mb-2 flex items-center gap-2 text-sm font-bold"><Icon className="size-4 text-accent-foreground"/>{label}</div><Textarea value={parts[key]} onChange={e=>setParts({...parts,[key]:e.target.value})} className="min-h-20 resize-none bg-muted/40 leading-6"/></div>)}</div>:<EmptyState icon={FileText} title="Your summary will appear here" text="Add meeting notes to extract the essential outcomes in a consistent format."/>}</>} />;
}

type Task={id:number;name:string;deadline:string;priority:string;time:string};
function TaskPlanner(){
  const [tasks,setTasks]=useState<Task[]>([{id:1,name:"Prepare quarterly review",deadline:"Friday",priority:"High",time:"90"},{id:2,name:"Reply to client feedback",deadline:"Today",priority:"High",time:"30"}]); const [mode,setMode]=useState("Daily"); const [loading,setLoading]=useState(false); const [schedule,setSchedule]=useState("");
  const update=(id:number,key:keyof Task,val:string)=>setTasks(tasks.map(t=>t.id===id?{...t,[key]:val}:t));
  const generate=()=>{if(!tasks.some(t=>t.name.trim())){toast.error("Add at least one task first");return;}setLoading(true);delay(()=>{const sorted=[...tasks].filter(t=>t.name).sort((a,b)=>({High:0,Medium:1,Low:2}[a.priority]??1)-({High:0,Medium:1,Low:2}[b.priority]??1));setSchedule(sorted.map((t,i)=>`${i===0?"09:00":i===1?"11:00":`${13+i}:00`} — ${t.name}\n${t.time || "30"} min • ${t.priority} priority • Due ${t.deadline || "this week"}`).join("\n\n"));setLoading(false);toast.success(`${mode} schedule created`);});};
  return <ToolLayout intro={<PageIntro eyebrow="Planning" title="AI Task Planner" body="Balance priorities, deadlines, and available time in a practical plan you can adjust."/>} input={<><ToolHeader title="Tasks" actions={<Button variant="outline" size="sm" onClick={()=>setTasks([...tasks,{id:Date.now(),name:"",deadline:"",priority:"Medium",time:"30"}])}><Plus/>Add task</Button>}/><div className="space-y-3">{tasks.map((task,i)=><div key={task.id} className="rounded-lg border border-border bg-muted/30 p-3"><div className="mb-3 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2"><span className="grid size-6 place-items-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">{i+1}</span><Input value={task.name} onChange={e=>update(task.id,"name",e.target.value)} placeholder="Task name" className="border-0 bg-transparent px-1 font-semibold shadow-none"/><Button variant="ghost" size="icon" onClick={()=>setTasks(tasks.filter(t=>t.id!==task.id))} aria-label="Remove task"><X/></Button></div><div className="grid grid-cols-3 gap-2"><Input value={task.deadline} onChange={e=>update(task.id,"deadline",e.target.value)} placeholder="Deadline"/><select value={task.priority} onChange={e=>update(task.id,"priority",e.target.value)} className="h-9 min-w-0 rounded-md border border-input bg-card px-2 text-xs outline-none focus:ring-1 focus:ring-ring"><option>High</option><option>Medium</option><option>Low</option></select><div className="relative"><Input type="number" min="5" value={task.time} onChange={e=>update(task.id,"time",e.target.value)} className="pr-8"/><span className="absolute right-2 top-2.5 text-[10px] text-muted-foreground">min</span></div></div></div>)}</div><Field label="Schedule view"><div className="mt-4 grid grid-cols-2 gap-2">{["Daily","Weekly"].map(m=><Button key={m} variant={mode===m?"default":"outline"} onClick={()=>setMode(m)}>{m}</Button>)}</div></Field><Button className="mt-5 h-11 w-full" onClick={generate} disabled={loading}>{loading?<LoaderCircle className="animate-spin"/>:<CalendarDays/>}Build {mode.toLowerCase()} plan</Button></>} output={<><ToolHeader title={`${mode} schedule`} actions={schedule&&<ActionButtons onCopy={()=>copyText(schedule)} onRegenerate={generate} onClear={()=>setSchedule("")}/>}/>{loading?<LoadingState label="Balancing your priorities"/>:schedule?<Textarea value={schedule} onChange={e=>setSchedule(e.target.value)} className="min-h-[360px] resize-none border-0 p-0 font-medium leading-7 shadow-none focus-visible:ring-0"/>:<EmptyState icon={CalendarDays} title="Your focused plan will appear here" text="Add tasks, check their priority and duration, then build a schedule."/>}</>} />;
}

function SettingsPanel(){return <><PageIntro eyebrow="Preferences" title="Settings" body="Choose how the assistant prepares new content. These preferences apply only during this browser session."/><div className="surface-card max-w-2xl rounded-lg p-6"><ToolHeader title="Output preferences"/><div className="space-y-5"><Field label="Default email tone"><select className="h-10 w-full rounded-md border border-input bg-card px-3 text-sm outline-none focus:ring-1 focus:ring-ring"><option>Formal</option><option>Friendly</option><option>Persuasive</option></select></Field><Field label="Default schedule"><select className="h-10 w-full rounded-md border border-input bg-card px-3 text-sm outline-none focus:ring-1 focus:ring-ring"><option>Daily</option><option>Weekly</option></select></Field><div className="rounded-lg border border-border bg-muted/40 p-4"><p className="text-sm font-semibold">Privacy by design</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Your entries stay in this browser session and are not sent to a server.</p></div><Button onClick={()=>toast.success("Preferences saved for this session")}><Check/>Save preferences</Button></div></div><Disclaimer/></>}
function Disclaimer(){return <div className="mt-8 flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-xs leading-5 text-muted-foreground"><Info className="mt-0.5 size-4 shrink-0 text-accent-foreground"/><p><strong className="text-foreground">Responsible AI:</strong> {DISCLAIMER}</p></div>}