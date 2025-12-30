'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  title: 'Simple Pricing',
  subtitle: 'Choose the plan that works for you',
  billingToggle: true,
  monthlyLabel: 'Monthly',
  yearlyLabel: 'Yearly',
  yearlyDiscount: 'Save 20%',
  plans: [
    {
      name: 'Starter',
      description: 'Perfect for individuals getting started',
      monthlyPrice: 9,
      yearlyPrice: 7,
      currency: '$',
      period: 'month',
      features: ['Up to 5 projects', 'Basic analytics', 'Email support'],
      ctaText: 'Get Started',
      ctaHref: '/signup?plan=starter',
      popular: false,
    },
    {
      name: 'Pro',
      description: 'Best for growing teams and businesses',
      monthlyPrice: 29,
      yearlyPrice: 23,
      currency: '$',
      period: 'month',
      features: [
        'Unlimited projects',
        'Advanced analytics',
        'Priority support',
        'Team collaboration',
      ],
      ctaText: 'Start Free Trial',
      ctaHref: '/signup?plan=pro',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'Custom solutions for large organizations',
      monthlyPrice: 99,
      yearlyPrice: 79,
      currency: '$',
      period: 'month',
      features: ['Everything in Pro', 'Custom integrations', 'Dedicated support', 'SLA guarantee'],
      ctaText: 'Contact Sales',
      ctaHref: '/contact?plan=enterprise',
      popular: false,
    },
  ],
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [isYearly, setIsYearly] = useState(false);

  const handlePlanSelect = (href: string) => {
    navigate(href);
  };

  const toggleBilling = () => {
    setIsYearly(!isYearly);
  };

  return (
    <section id="pricing" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Billing Toggle */}
          {config.billingToggle && (
            <div className="flex items-center justify-center gap-4 mb-8">
              <span
                className={`text-sm ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
              >
                <span data-editable="monthlyLabel">{config.monthlyLabel}</span>
              </span>
              <button
                onClick={toggleBilling}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                role="switch"
                aria-checked={isYearly}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-primary transition-transform ${
                    isYearly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
                >
                  <span data-editable="yearlyLabel">{config.yearlyLabel}</span>
                </span>
                <Badge variant="secondary" className="text-xs">
                  <span data-editable="yearlyDiscount">{config.yearlyDiscount}</span>
                </Badge>
              </div>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {config.plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative transition-all duration-200 hover:shadow-lg ${
                plan.popular
                  ? 'border-primary shadow-lg scale-105'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <h3 className="text-xl font-semibold mb-2">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold">
                    <span data-editable={`plans[${idx}].currency`}>{plan.currency}</span>
                    <span
                      data-editable={`plans[${idx}].${isYearly ? 'yearlyPrice' : 'monthlyPrice'}`}
                    >
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                  </span>
                  <span className="text-muted-foreground">
                    /<span data-editable={`plans[${idx}].period`}>{plan.period}</span>
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <span data-editable={`plans[${idx}].features[${featureIdx}]`}>
                          {feature}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelect(plan.ctaHref)}
                  data-editable-href={`plans[${idx}].ctaHref`}
                  data-href={plan.ctaHref}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground text-sm">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
