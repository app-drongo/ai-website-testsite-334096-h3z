'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useFormSubmit } from '@/hooks/useFormSubmit';

const DEFAULT_CONTACT = {
  title: 'Get in Touch',
  subtitle: 'Ready to get started? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
  contactInfo: [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@testsite.com',
      href: 'mailto:hello@testsite.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'Office',
      value: '123 Business St, Suite 100\nSan Francisco, CA 94105',
      href: null
    },
    {
      icon: Clock,
      label: 'Hours',
      value: 'Mon-Fri: 9AM-6PM PST\nWeekends: By appointment',
      href: null
    }
  ],
  formFields: [
    { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'John Doe' },
    { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'john@example.com' },
    { name: 'company', label: 'Company', type: 'text', required: false, placeholder: 'Your Company' },
    { name: 'subject', label: 'Subject', type: 'text', required: true, placeholder: 'How can we help?' },
    { name: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'Tell us more about your project...' }
  ],
  submitText: 'Send Message',
  successMessage: 'Thank you for your message! We\'ll get back to you soon.',
} as const;

type ContactProps = Partial<typeof DEFAULT_CONTACT>;

export default function Contact(props: ContactProps) {
  const config = { ...DEFAULT_CONTACT, ...props };
  const { handleSubmit, isSubmitting, isSuccess, message } = useFormSubmit();
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactClick = (href: string | null) => {
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="contact" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {config.contactInfo.map((info, idx) => {
                  const IconComponent = info.icon;
                  return (
                    <Card
                      key={idx}
                      className={`transition-all duration-200 hover:shadow-md ${
                        info.href ? 'cursor-pointer hover:border-primary/50' : ''
                      }`}
                      onClick={() => handleContactClick(info.href)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 text-primary p-2 rounded-lg flex-shrink-0">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-medium text-sm text-muted-foreground mb-1">
                              <span data-editable={`contactInfo[${idx}].label`}>{info.label}</span>
                            </h4>
                            <p className="text-sm whitespace-pre-line">
                              <span data-editable={`contactInfo[${idx}].value`}>{info.value}</span>
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-muted/50 rounded-lg p-6">
              <h4 className="font-semibold mb-3">Why Choose Us?</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm">Quick response within 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm">Free consultation and quote</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm">Trusted by 50,000+ customers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="bg-green-100 text-green-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    {message || config.successMessage}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  data-form-id="contact-form"
                  className="space-y-6"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    {config.formFields.slice(0, 3).map((field, idx) => (
                      <div
                        key={field.name}
                        className={field.name === 'email' ? 'sm:col-span-2' : ''}
                      >
                        <label
                          htmlFor={field.name}
                          className="block text-sm font-medium mb-2"
                        >
                          <span data-editable={`formFields[${idx}].label`}>{field.label}</span>
                          {field.required && <span className="text-destructive ml-1">*</span>}
                        </label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          required={field.required}
                          placeholder={field.placeholder}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Subject field */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      <span data-editable="formFields[3].label">{config.formFields[3].label}</span>
                      <span className="text-destructive ml-1">*</span>
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      placeholder={config.formFields[3].placeholder}
                      value={formData.subject || ''}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full"
                    />
                  </div>

                  {/* Message field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      <span data-editable="formFields[4].label">{config.formFields[4].label}</span>
                      <span className="text-destructive ml-1">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      placeholder={config.formFields[4].placeholder}
                      value={formData.message || ''}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="w-full min-h-[120px] resize-y"
                    />
                  </div>

                  {message && !isSuccess && (
                    <div className="bg-destructive/10 text-destructive border border-destructive/20 rounded-md p-3 text-sm">
                      {message}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        <span data-editable="submitText">{config.submitText}</span>
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}