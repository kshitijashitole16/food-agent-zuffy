import Hero from '../components/chat/Hero';
import ChatPanel from '../components/chat/ChatPanel';
import PreferencesPanel from '../components/chat/PreferencesPanel';
import Favorites from '../components/menu/Favorites';
import type { useMenu } from '../hooks/useMenu';
import type { useChat } from '../hooks/useChat';
import type { usePreferences } from '../hooks/usePreferences';
import type { MenuItem } from '../types/api';

interface AssistantPageProps {
  catalog: ReturnType<typeof useMenu>;
  chat: ReturnType<typeof useChat>;
  preferences: ReturnType<typeof usePreferences>;
  onSend: (message?: string) => void;
  onAdd: (item: MenuItem) => void;
  onExplore: () => void;
}

export default function AssistantPage({
  catalog,
  chat,
  preferences,
  onSend,
  onAdd,
  onExplore,
}: AssistantPageProps) {
  return (
    <>
      <Hero />
      <div className="assistant-layout">
        <ChatPanel
          messages={chat.messages}
          input={chat.input}
          busy={chat.busy}
          error={chat.error}
          onInputChange={chat.setInput}
          onSend={onSend}
          onClear={chat.clear}
          onAdd={onAdd}
        />
        <PreferencesPanel
          diet={preferences.diet}
          avoid={preferences.avoid}
          busy={chat.busy}
          onDietChange={preferences.setDiet}
          onAvoidChange={preferences.setAvoid}
          onSend={onSend}
        />
      </div>
      <Favorites
        menu={catalog.menu}
        loading={catalog.loading}
        error={catalog.error}
        onRetry={catalog.refresh}
        onExplore={onExplore}
        onAdd={onAdd}
      />
    </>
  );
}
