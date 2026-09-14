import { FormEvent, useMemo, useState } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardText, CardTitle } from '@/components/ui/Card';
import { menuItems } from '@/data/mock';
import { calculatePalateProfile, getProfileDescription, loadTastingEntries } from '@/lib/palate';
import { getMenuRecommendations } from '@/lib/recommendations';

type Message = { role: 'assistant' | 'guest'; text: string };

function createAnswer(question: string, profileDescription: string, recommendation: string) {
  const normalizedQuestion = question.toLowerCase();
  if (normalizedQuestion.includes('recommend') || normalizedQuestion.includes('taste') || normalizedQuestion.includes('like')) {
    return `Based on your current profile, I would start with ${recommendation}. ${profileDescription}`;
  }
  if (normalizedQuestion.includes('profile') || normalizedQuestion.includes('palate')) {
    return profileDescription;
  }
  if (normalizedQuestion.includes('event') || normalizedQuestion.includes('dress')) {
    return 'For a tasting event, arrive with a clear palate, take small sips, and keep water nearby. I can connect event recommendations once your event preferences are available.';
  }
  return 'I can help with recommendations, palate preferences, tasting etiquette, and event preparation. Try asking, “What should I taste next?”';
}

export function ConciergePage() {
  const profile = useMemo(() => calculatePalateProfile(loadTastingEntries()), []);
  const recommendations = useMemo(() => getMenuRecommendations(profile, menuItems), [profile]);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Welcome to TasteFlow Concierge. Ask me what to taste next, or ask about your palate profile.' },
  ]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;
    const recommendation = recommendations[0]?.name ?? 'a tasting flight from the marketplace';
    setMessages((currentMessages) => [
      ...currentMessages,
      { role: 'guest', text: trimmedQuestion },
      { role: 'assistant', text: createAnswer(trimmedQuestion, getProfileDescription(profile), recommendation) },
    ]);
    setQuestion('');
  }

  return (
    <section className="container-page py-12">
      <div className="premium-shell p-7 sm:p-10 lg:p-12">
        <div className="chip w-fit"><Sparkles size={14} /> TasteFlow Concierge</div>
        <h1 className="section-title mt-5 max-w-4xl">A calm guide for the next good pour.</h1>
        <p className="section-copy mt-5">This local concierge uses your Palate DNA and the current TasteFlow catalog to answer practical tasting questions. A model-backed service can replace the response layer later.</p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
        <Card className="h-fit p-6"><p className="eyebrow">Your context</p><CardTitle className="mt-3">Palate-aware guidance</CardTitle><CardText className="mt-2">{getProfileDescription(profile)}</CardText><div className="mt-6 grid gap-3">{recommendations.map((recommendation) => <div key={recommendation.id} className="rounded-2xl bg-[rgb(var(--secondary))] p-4 text-sm"><p className="font-semibold">{recommendation.name}</p><p className="mt-1 text-[rgb(var(--muted-foreground))]">{recommendation.match}% profile match</p></div>)}</div></Card>
        <Card className="p-4 sm:p-6">
          <div className="mb-5 flex items-center gap-3 border-b border-[rgb(var(--border))]/70 pb-5"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-[rgb(var(--secondary))] text-[rgb(var(--primary))]"><Bot /></span><div><CardTitle>Concierge chat</CardTitle><CardText className="mt-1">Personal guidance from your saved preferences</CardText></div></div>
          <div className="grid min-h-80 content-start gap-4">
            {messages.map((message, index) => <div key={`${message.role}-${index}`} className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 ${message.role === 'guest' ? 'ml-auto bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]' : 'bg-[rgb(var(--secondary))]'}`}>{message.text}</div>)}
          </div>
          <form className="mt-6 flex gap-2" onSubmit={handleSubmit}><input className="h-12 min-w-0 flex-1 rounded-full border border-[rgb(var(--border))] bg-white/70 px-5 dark:bg-white/5" placeholder="What should I taste next?" value={question} onChange={(event) => setQuestion(event.target.value)} /><Button type="submit" aria-label="Send question"><Send size={18} /></Button></form>
        </Card>
      </div>
    </section>
  );
}