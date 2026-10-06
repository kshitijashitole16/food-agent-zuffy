import { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ConnectionStatus from './components/layout/ConnectionStatus';
import Toast from './components/common/Toast';
import BagDrawer from './components/cart/BagDrawer';
import AssistantPage from './pages/AssistantPage';
import MenuPage from './pages/MenuPage';
import OrdersPage from './pages/OrdersPage';
import { useSession } from './hooks/useSession';
import { usePreferences } from './hooks/usePreferences';
import { useToast } from './hooks/useToast';
import { useHealth } from './hooks/useHealth';
import { useMenu } from './hooks/useMenu';
import { useChat } from './hooks/useChat';
import { useCart } from './hooks/useCart';
import { useOrders } from './hooks/useOrders';
import type { Tab } from './types/api';

/** App composes screens and coordinates navigation; feature logic lives in hooks. */
export default function App() {
  const [tab, setTab] = useState<Tab>('assistant');
  const [bagOpen, setBagOpen] = useState(false);
  const sessionId = useSession();
  const preferences = usePreferences();
  const { toast, notify } = useToast();
  const connection = useHealth();
  const catalog = useMenu();
  const chat = useChat(sessionId, preferences, connection.markReady);
  const cart = useCart(catalog.menu, notify);
  const orders = useOrders(sessionId, tab === 'orders');

  function navigate(next: Tab) {
    setTab(next);
    if (next === 'orders') void orders.refresh();
  }
  function ask(message?: string) {
    setTab('assistant');
    void chat.send(message);
  }
  function explore() {
    setBagOpen(false);
    navigate('menu');
  }
  async function checkout() {
    const order = await orders.placeOrder(
      cart.lines.map((item) => ({ itemId: item.id, quantity: item.quantity })),
    );
    if (!order) return;
    cart.clear();
    setBagOpen(false);
    setTab('orders');
    notify(`Demo order ${order.id} created`);
  }

  return (
    <div className="app-shell">
      <Header
        tab={tab}
        count={cart.count}
        onNavigate={navigate}
        onOpenBag={() => setBagOpen(true)}
      />
      <main>
        <ConnectionStatus health={connection.health} onRefresh={connection.refresh} />
        {tab === 'assistant' && (
          <AssistantPage
            catalog={catalog}
            chat={chat}
            preferences={preferences}
            onSend={ask}
            onAdd={cart.add}
            onExplore={explore}
          />
        )}
        {tab === 'menu' && (
          <MenuPage
            menu={catalog.menu}
            loading={catalog.loading}
            error={catalog.error}
            diet={preferences.diet}
            onDietChange={preferences.setDiet}
            onRetry={catalog.refresh}
            onAdd={cart.add}
            onOpenChat={() => navigate('assistant')}
          />
        )}
        {tab === 'orders' && (
          <OrdersPage
            orders={orders.orders}
            error={orders.error}
            onRefresh={orders.refresh}
            onAsk={ask}
            onExplore={explore}
          />
        )}
      </main>
      <Footer />
      <Toast message={toast} />
      {bagOpen && (
        <BagDrawer
          lines={cart.lines}
          count={cart.count}
          subtotal={cart.subtotal}
          deliveryFee={cart.deliveryFee}
          busy={orders.checkoutBusy}
          error={orders.checkoutError}
          onClose={() => setBagOpen(false)}
          onExplore={explore}
          onCheckout={() => {
            void checkout();
          }}
          onChangeQuantity={cart.changeQuantity}
        />
      )}
    </div>
  );
}
