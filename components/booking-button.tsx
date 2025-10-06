'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from 'lucide-react';

interface Experience {
  id: number;
  title: string;
  description: string;
  shop_name: string;
  category: string;
  price: number;
  duration: number;
  level: string;
  city: string;
}

interface BookingButtonProps {
  experience: Experience;
}

export function BookingButton({ experience }: BookingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/v2/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          experience_id: experience.id,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          preferred_date: formData.date,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          message: ''
        });
        // Close dialog after 2 seconds
        setTimeout(() => {
          setIsOpen(false);
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Booking error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
          <Calendar className="h-4 w-4 mr-2" />
          Book Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book: {experience.title}</DialogTitle>
          <DialogDescription>
            {experience.shop_name} • {experience.city} • €{experience.price} • {experience.duration} min
          </DialogDescription>
        </DialogHeader>

        {submitStatus === 'success' ? (
          <div className="text-center py-8">
            <div className="text-green-600 text-6xl mb-4">✅</div>
            <h3 className="text-lg font-semibold text-green-600 mb-2">Booking Request Sent!</h3>
            <p className="text-gray-600">The workshop owner will contact you soon to confirm your booking.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Your full name"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+34 600 000 000"
              />
            </div>

            <div>
              <Label htmlFor="date">Preferred Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <Label htmlFor="message">Message (optional)</Label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Any special requests or questions..."
                className="w-full px-3 py-2 border border-input rounded-md bg-background min-h-[80px] resize-none"
              />
            </div>

            {submitStatus === 'error' && (
              <div className="text-red-600 text-sm">
                Sorry, there was an error sending your booking request. Please try again.
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Booking Request'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}