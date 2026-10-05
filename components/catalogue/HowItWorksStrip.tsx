import { Compass, Ruler, Calculator, Sparkles, Truck } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'Choose a Design',
    desc: 'Browse our catalogue or bring a reference photo from Pinterest or Instagram.',
    icon: Compass,
  },
  {
    number: '02',
    title: 'Specify Wood & Size',
    desc: 'Select preferred solid timber (Teak, Country Wood, Rosewood) and exact dimensions.',
    icon: Ruler,
  },
  {
    number: '03',
    title: 'Get Transparent Quote',
    desc: 'Chat directly with our Kangeyam showroom team on WhatsApp for clear pricing.',
    icon: Calculator,
  },
  {
    number: '04',
    title: 'Custom-Crafted to Order',
    desc: 'Your piece is custom-made to your exact specifications with premium joinery.',
    icon: Sparkles,
  },
  {
    number: '05',
    title: 'Delivered to Your Home',
    desc: 'Safe delivery and careful placement in your home across Kangeyam and Tamil Nadu.',
    icon: Truck,
  },
];

export default function HowItWorksStrip() {
  return (
    <section className="how-it-works-section" aria-labelledby="how-it-works-title">
      <div className="container-standard">
        <div className="strip-header">
          <span className="strip-badge">Seamless Process</span>
          <h2 id="how-it-works-title" className="strip-title">
            How Custom Ordering Works
          </h2>
          <p className="strip-subtitle">
            From your concept to doorstep delivery — tailored entirely around your home.
          </p>
        </div>

        <div className="steps-container">
          <div className="steps-grid">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="step-card">
                  <div className="step-top">
                    <span className="step-number">{step.number}</span>
                    <div className="step-icon-wrapper">
                      <Icon size={20} className="step-icon" />
                    </div>
                  </div>
                  <h3 className="step-heading">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .how-it-works-section {
          padding: 3.5rem 0;
          background-color: var(--bg-surface-secondary);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          margin: 2rem 0;
        }

        .strip-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 2.5rem;
        }

        .strip-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent-primary);
          margin-bottom: 0.5rem;
        }

        .strip-title {
          font-size: clamp(1.4rem, 3.5vw, 1.85rem);
          margin-bottom: 0.5rem;
        }

        .strip-subtitle {
          font-size: 0.95rem;
          color: var(--text-muted);
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.25rem;
        }

        .step-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.25rem 1rem;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: var(--shadow-sm);
        }

        .step-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .step-number {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--accent-primary);
          opacity: 0.8;
        }

        .step-icon-wrapper {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          background-color: var(--accent-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .step-icon {
          color: var(--accent-primary);
        }

        .step-heading {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.4rem;
          line-height: 1.25;
        }

        .step-desc {
          font-size: 0.825rem;
          line-height: 1.45;
          color: var(--text-muted);
        }

        @media (max-width: 992px) {
          .steps-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 640px) {
          .how-it-works-section {
            padding: 2.5rem 0;
          }

          .steps-container {
            overflow-x: auto;
            margin-left: -1rem;
            margin-right: -1rem;
            padding-left: 1rem;
            padding-right: 1rem;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .steps-container::-webkit-scrollbar {
            display: none;
          }

          .steps-grid {
            display: flex;
            gap: 0.85rem;
            width: max-content;
            padding-bottom: 0.5rem;
          }

          .step-card {
            width: 240px;
            flex-shrink: 0;
          }
        }
      `}</style>
    </section>
  );
}
