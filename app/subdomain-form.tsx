'use client';

import type React from 'react';

import { useState } from 'react';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Smile } from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerSearch,
  EmojiPickerFooter
} from '@/components/ui/emoji-picker';
import { createSubdomainAction } from '@/app/actions';
import { rootDomain } from '@/lib/utils';

type CreateState = {
  error?: string;
  success?: boolean;
  subdomain?: string;
  icon?: string;
};

function SubdomainInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="subdomain">Subdomain</Label>
      <div className="flex items-center">
        <div className="relative flex-1">
          <Input
            id="subdomain"
            name="subdomain"
            placeholder="your-subdomain"
            defaultValue={defaultValue}
            className="w-full rounded-r-none focus:z-10"
            required
          />
        </div>
        <span className="bg-gray-100 px-3 border border-l-0 border-input rounded-r-md text-gray-500 min-h-[36px] flex items-center">
          .{rootDomain}
        </span>
      </div>
    </div>
  );
}

function IconPicker({
  icon,
  setIcon,
  defaultValue
}: {
  icon: string;
  setIcon: (icon: string) => void;
  defaultValue?: string;
}) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleEmojiSelect = ({ emoji }: { emoji: string }) => {
    setIcon(emoji);
    setIsPickerOpen(false);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="icon">Icon</Label>
      <div className="flex flex-col gap-2">
        <input type="hidden" name="icon" value={icon} required />
        <div className="flex items-center gap-2">
          <Card className="flex-1 flex flex-row items-center justify-between p-2 border border-input rounded-md">
            <div className="min-w-[40px] min-h-[40px] flex items-center pl-[14px] select-none">
              {icon ? (
                <span className="text-3xl">{icon}</span>
              ) : (
                <span className="text-gray-400 text-sm font-normal">
                  No icon selected
                </span>
              )}
            </div>
            <Popover open={isPickerOpen} onOpenChange={setIsPickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="ml-auto rounded-sm"
                  onClick={() => setIsPickerOpen(!isPickerOpen)}
                >
                  <Smile className="h-4 w-4 mr-2" />
                  Select Emoji
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="p-0 w-[256px]"
                align="end"
                sideOffset={5}
              >
                <EmojiPicker
                  className="h-[300px] w-[256px]"
                  defaultValue={defaultValue}
                  onEmojiSelect={handleEmojiSelect}
                >
                  <EmojiPickerSearch />
                  <EmojiPickerContent />
                  <EmojiPickerFooter />
                </EmojiPicker>
              </PopoverContent>
            </Popover>
          </Card>
        </div>
        <p className="text-xs text-gray-500">
          Select an emoji to represent your subdomain
        </p>
      </div>
    </div>
  );
}

export function SubdomainForm() {
  const [icon, setIcon] = useState('');

  const [state, action, isPending] = useActionState<CreateState, FormData>(
    createSubdomainAction,
    {}
  );

  return (
    <form action={action} className="space-y-6">
      <SubdomainInput defaultValue={state?.subdomain} />

      <IconPicker icon={icon} setIcon={setIcon} defaultValue={state?.icon} />

      <div className="space-y-2">
        <Label htmlFor="name">Marketplace Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Your Creative Studio"
          className="w-full"
        />
        <p className="text-xs text-gray-500">
          Display name for your marketplace
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          placeholder="Beautiful handmade pottery and ceramics workshops"
          className="w-full"
        />
        <p className="text-xs text-gray-500">
          Brief description of your marketplace
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Specialization</Label>
        <select
          id="category"
          name="category"
          className="w-full px-3 py-2 border border-input rounded-md bg-background"
        >
          <option value="">All Creative Experiences</option>
          <option value="Cerámica">Ceramics & Pottery</option>
          <option value="Pintura">Painting & Drawing</option>
          <option value="Arte">General Arts & Crafts</option>
        </select>
        <p className="text-xs text-gray-500">
          Optional: Focus on specific types of experiences
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          placeholder="Barcelona, Spain"
          className="w-full"
        />
        <p className="text-xs text-gray-500">
          City or region for your marketplace
        </p>
      </div>

      {state?.error && (
        <div className="text-sm text-red-500">{state.error}</div>
      )}

      {state?.success && (
        <div className="text-sm text-green-600 p-3 bg-green-50 rounded-md">
          Success! Your marketplace is ready at{' '}
          <a
            href={`http://${state.subdomain}.localhost:3000`}
            className="font-semibold hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {state.subdomain}.localhost:3000
          </a>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isPending || !icon}>
        {isPending ? 'Creating Marketplace...' : 'Create Marketplace'}
      </Button>
    </form>
  );
}
