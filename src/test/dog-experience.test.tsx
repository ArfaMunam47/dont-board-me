import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Services, ContactSection, CompleteFooter } from '@/components/dog-sections';
import { DogHomepage } from '@/components/dog-homepage';

afterEach(cleanup);
beforeEach(() => {
  vi.restoreAllMocks();
  window.history.replaceState(null, '', '/');
});

describe('Dog care enquiry', () => {
  it('focuses the first missing field and does not accept incomplete enquiries', () => {
    render(<ContactSection />);
    fireEvent.click(screen.getByRole('button', { name: /check my enquiry/i }));
    expect(screen.getByLabelText(/your name/i)).toHaveFocus();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('validates a complete enquiry locally without making a submission request', () => {
    const request = vi.spyOn(globalThis, 'fetch');
    render(<ContactSection />);
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Alex' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'alex@example.com' } });
    fireEvent.change(screen.getByLabelText(/your dog’s name/i), { target: { value: 'Milo' } });
    fireEvent.change(screen.getByLabelText(/a little about your dog/i), { target: { value: 'Milo enjoys gentle walks.' } });
    fireEvent.click(screen.getByRole('radio', { name: /pet visits/i }));
    fireEvent.click(screen.getByRole('button', { name: /check my enquiry/i }));
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(request).not.toHaveBeenCalled();
    fireEvent.change(screen.getByLabelText(/your dog’s name/i), { target: { value: 'Luna' } });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});

describe('Accessible homepage navigation', () => {
  it('exposes every service enquiry link in the non-animated layout', () => {
    render(<Services />);
    expect(screen.getByRole('link', { name: /explore dog walks/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /explore pet visits/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /explore both/i })).toBeInTheDocument();
    expect(document.querySelectorAll('article[inert]')).toHaveLength(0);
  });

  it('footer service navigation targets its service article rather than a hidden control', () => {
    Element.prototype.scrollIntoView = vi.fn();
    render(<><Services /><CompleteFooter /></>);
    fireEvent.click(screen.getByRole('link', { name: 'Pet visits' }));
    expect(window.location.hash).toBe('#pet-visits');
    expect(document.getElementById('pet-visits')?.tagName).toBe('ARTICLE');
  });

  it('Escape from a mobile navigation link closes the menu and restores toggle focus', () => {
    render(<DogHomepage />);
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
    const link = screen.getByRole('navigation', { name: 'Main navigation' }).querySelector('a');
    if (!link) throw new Error('Navigation link missing');
    link.focus();
    fireEvent.keyDown(link, { key: 'Escape' });
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  });
});