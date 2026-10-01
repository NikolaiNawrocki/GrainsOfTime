"use client";

import React, { useState } from "react";
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/sanity.config";
import { projectId } from "@/sanity/env";
import { isSanityConfigured } from "@/sanity/client";
import {
  AlertCircle,
  ExternalLink,
  Key,
  ShieldCheck,
  Globe,
  RefreshCw,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: (error: Error, reset: () => void) => React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class StudioErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("Studio caught error:", error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback(this.state.error, this.reset);
    }
    return this.props.children;
  }
}

export default function StudioPage() {
  const [bypassCheck, setBypassCheck] = useState(false);

  // If Sanity is not yet configured with a real Project ID, show connection instructions
  if (!isSanityConfigured && !bypassCheck) {
    return <SanitySetupGuide onBypass={() => setBypassCheck(true)} />;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0F0F12] text-zinc-100 overflow-auto">
      <StudioErrorBoundary
        fallback={(error, reset) => (
          <CorsOrConfigErrorView error={error} onReset={reset} />
        )}
      >
        <NextStudio config={config} />
      </StudioErrorBoundary>
    </div>
  );
}

function SanitySetupGuide({ onBypass }: { onBypass: () => void }) {
  const [copied, setCopied] = useState(false);

  const envSnippet = `NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here\nNEXT_PUBLIC_SANITY_DATASET=production`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(envSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0A0A0D] text-grains-paper overflow-y-auto font-sans p-6 sm:p-12 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full bg-[#141418] border border-zinc-800 rounded-lg p-8 sm:p-10 shadow-2xl space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-grains-red" />
              <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                Grains of Time • Website Manager
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif text-white">
              Connect Your Sanity CMS Project
            </h1>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Website</span>
          </Link>
        </div>

        {/* Why this is needed */}
        <p className="text-sm text-zinc-300 leading-relaxed">
          The website&apos;s visual editor needs to connect to your Sanity.io project database. Once connected, authorized members can manage the homepage, members, events, and photos permanently without coding.
        </p>

        {/* Step-by-Step Instructions */}
        <div className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-grains-red-bright">
            Quick 3-Step Setup (Takes 2 Minutes)
          </h2>

          <ol className="space-y-4 text-sm text-zinc-300 font-sans">
            <li className="flex items-start gap-3 p-4 bg-[#1A1A22] rounded border border-zinc-800/80">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-grains-red text-white text-xs font-bold shrink-0 mt-0.5">
                1
              </span>
              <div className="space-y-1">
                <p className="font-medium text-white">Get your Free Sanity Project ID</p>
                <p className="text-xs text-zinc-400">
                  Log in or sign up at{" "}
                  <a
                    href="https://sanity.io/manage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-grains-red-bright hover:underline inline-flex items-center gap-0.5"
                  >
                    sanity.io/manage <ExternalLink className="w-3 h-3" />
                  </a>
                  . Create a project named &ldquo;Grains of Time&rdquo; and copy the <strong>Project ID</strong> (an 8-character code like <code>a1b2c3d4</code>).
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3 p-4 bg-[#1A1A22] rounded border border-zinc-800/80">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-grains-red text-white text-xs font-bold shrink-0 mt-0.5">
                2
              </span>
              <div className="space-y-2 flex-1">
                <p className="font-medium text-white">Paste your Project ID in <code>.env.local</code></p>
                <p className="text-xs text-zinc-400">
                  Open the file <code>.env.local</code> in the project folder and paste your ID:
                </p>
                <div className="relative bg-black/60 p-3 rounded font-mono text-xs text-zinc-300 border border-zinc-800">
                  <code>NEXT_PUBLIC_SANITY_PROJECT_ID=your_id_here</code>
                  <button
                    onClick={copyToClipboard}
                    className="absolute right-2 top-2 px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-[10px] uppercase tracking-wider rounded text-zinc-200 transition-colors"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </li>

            <li className="flex items-start gap-3 p-4 bg-[#1A1A22] rounded border border-zinc-800/80">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-grains-red text-white text-xs font-bold shrink-0 mt-0.5">
                3
              </span>
              <div className="space-y-1">
                <p className="font-medium text-white">Authorize Localhost in CORS Settings</p>
                <p className="text-xs text-zinc-400">
                  In your Sanity dashboard under <strong>API → CORS Origins</strong>, click <strong>+ Add CORS Origin</strong>, enter:
                </p>
                <div className="bg-black/60 px-3 py-1.5 rounded font-mono text-xs text-zinc-300 inline-block border border-zinc-800">
                  http://localhost:3000
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Check the box for <strong>Allow credentials</strong> and save.
                </p>
              </div>
            </li>
          </ol>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-grains-red hover:bg-grains-red-bright text-white text-xs font-mono tracking-widest uppercase rounded transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload Studio</span>
          </button>

          <button
            onClick={onBypass}
            className="text-xs font-mono text-zinc-500 hover:text-zinc-300 uppercase tracking-wider transition-colors"
          >
            Try Opening Studio Anyway →
          </button>
        </div>
      </div>
    </div>
  );
}

function CorsOrConfigErrorView({
  error,
  onReset,
}: {
  error: Error;
  onReset: () => void;
}) {
  const isCors =
    error.name === "CorsOriginError" ||
    error.message?.toLowerCase().includes("cors") ||
    error.message?.toLowerCase().includes("origin");

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0A0A0D] text-grains-paper overflow-y-auto font-sans p-6 sm:p-12 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full bg-[#141418] border border-red-950/80 rounded-lg p-8 sm:p-10 shadow-2xl space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-950/40 border border-grains-red/30 rounded-full text-grains-red shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-serif text-white">
              {isCors
                ? "CORS Authorization Required"
                : "Studio Connection Error"}
            </h2>
            <p className="text-xs font-mono text-zinc-400">
              Project ID: <code className="text-grains-red-bright">{projectId}</code>
            </p>
          </div>
        </div>

        {isCors ? (
          <div className="space-y-4 text-sm text-zinc-300">
            <p>
              Sanity Cloud blocked the connection from <code>http://localhost:3000</code> because it hasn&apos;t been added to your project&apos;s allowed origins yet.
            </p>

            <div className="p-4 bg-[#1A1A22] rounded border border-zinc-800 space-y-3">
              <p className="font-medium text-white text-xs font-mono uppercase tracking-wider">
                How to fix this in 30 seconds:
              </p>
              <ol className="list-decimal list-inside space-y-1.5 text-xs text-zinc-400 font-sans">
                <li>
                  Open your Sanity project dashboard:{" "}
                  <a
                    href={`https://sanity.io/manage/project/${projectId}/api#cors`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-grains-red-bright hover:underline inline-flex items-center gap-1"
                  >
                    sanity.io/manage/project/{projectId}/api <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>Under <strong>CORS Origins</strong>, click <strong>+ Add CORS Origin</strong></li>
                <li>Enter Origin: <code className="text-white">http://localhost:3000</code></li>
                <li>Check <strong className="text-white">Allow credentials</strong></li>
                <li>Click <strong>Save</strong> and reload this page.</li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-[#1A1A22] rounded border border-zinc-800 text-xs font-mono text-zinc-300 overflow-x-auto">
            {error.message || String(error)}
          </div>
        )}

        <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-grains-red hover:bg-grains-red-bright text-white text-xs font-mono tracking-widest uppercase rounded transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload Studio</span>
          </button>

          <Link
            href="/"
            className="text-xs font-mono text-zinc-400 hover:text-white uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
