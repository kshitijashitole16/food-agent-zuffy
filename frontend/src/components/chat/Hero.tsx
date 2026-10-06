import Icon from '../common/Icon';
import FoodArt from '../common/FoodArt';
export default function Hero() {
  return (
    <section className="hero">
      <div>
        <span className="eyebrow">
          <Icon name="sparkle" size={14} /> YOUR FOOD COMPANION
        </span>
        <h1>
          Good food.
          <br />
          <span>Zero overthinking.</span>
        </h1>
        <p>
          A dinner idea, a quick recipe, or a little order help.
          <br className="desktop-break" /> Just ask Zuffy. We’ll figure it out together.
        </p>
      </div>
      <div className="hero-illustration" aria-hidden="true">
        <span className="orbit orbit-one">
          <FoodArt dish="avocado" />
        </span>
        <span className="orbit orbit-two">
          <FoodArt dish="tomato" />
        </span>
        <div className="hero-plate">
          <span>
            <FoodArt dish="noodles" />
          </span>
          <i className="plate-star">✦</i>
        </div>
        <span className="floating-note">
          made for your mood <span>↗</span>
        </span>
        <span className="hero-squiggle">✧</span>
      </div>
    </section>
  );
}
