'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  MonitorPlay,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
} from 'lucide-react';

export default function DemoVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Auto-hide controls after inactivity if playing
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isPlaying && isHovered) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    } else {
      setShowControls(true);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, isHovered, currentTime]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
    setIsPlaying(true);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => {
        setIsFullscreen(false);
      }).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '00:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="demo" className="py-20 sm:py-28 bg-black relative border-t border-zinc-900 rounded-none overflow-hidden">
      {/* Specular Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-500/[0.08] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[200px] bg-sky-400/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
            <MonitorPlay className="w-3.5 h-3.5" />
            <span>Interactive Demo</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            See Migraflow in Action
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Watch the end-to-end migration pipeline in real time: from connecting source databases and AI-assisted schema translation to deterministic streaming with zero memory spikes.
          </p>
        </div>

        {/* Video Showcase Window */}
        <div
          ref={containerRef}
          onMouseEnter={() => {
            setIsHovered(true);
            setShowControls(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          className="relative bg-zinc-950 border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.9)] group"
        >
          {/* Top Window Titlebar */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 select-none">
            {/* Left Window Dots */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-none bg-red-500/80 border border-red-500/90" />
              <span className="w-2.5 h-2.5 rounded-none bg-yellow-500/80 border border-yellow-500/90" />
              <span className="w-2.5 h-2.5 rounded-none bg-emerald-500/80 border border-emerald-500/90" />
            </div>

            {/* Right Status Tags */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-zinc-400">
                END-TO-END DEMO
              </span>
            </div>
          </div>

          {/* Video Player Display Area */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src="/videos/Migraflow_demo.mp4"
              playsInline
              autoPlay
              muted={isMuted}
              loop
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={togglePlay}
              className="w-full h-full object-contain cursor-pointer"
            />

            {/* Central Play/Pause Watermark Overlay (Only when paused) */}
            {!isPlaying && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Play video"
                className="absolute inset-0 m-auto w-20 h-20 flex items-center justify-center bg-black/60 backdrop-blur-md border border-sky-400/50 text-sky-400 hover:text-white hover:border-sky-300 hover:scale-105 transition-all shadow-[0_0_30px_rgba(56,189,248,0.3)] z-20 group/play"
              >
                <Play className="w-8 h-8 ml-1 fill-current" />
              </button>
            )}

            {/* Quick Unmute Floating Banner (Shown when muted & playing) */}
            {isMuted && isPlaying && (
              <button
                type="button"
                onClick={toggleMute}
                className="absolute top-4 right-4 z-20 bg-zinc-900/90 hover:bg-zinc-800 text-sky-400 hover:text-sky-300 border border-sky-400/40 px-3 py-1.5 text-xs font-mono flex items-center gap-2 backdrop-blur-md shadow-lg transition-all animate-pulse"
              >
                <VolumeX className="w-4 h-4 text-sky-400" />
                <span>Click to Unmute Audio</span>
              </button>
            )}

            {/* Bottom Cyber Controls Bar */}
            <div
              className={`absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black via-black/80 to-transparent p-4 transition-opacity duration-300 ${
                showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              {/* Scrubbing Timeline */}
              <div className="relative w-full h-1.5 bg-zinc-800 cursor-pointer group/slider mb-3 flex items-center">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Video timeline scrubber"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {/* Active Progress Line */}
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-sky-400 shadow-[0_0_10px_#38bdf8] transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Control Buttons & Indicators */}
              <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
                {/* Left Controls */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                    className="p-1.5 hover:text-sky-400 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    className="p-1.5 hover:text-sky-400 transition-colors flex items-center gap-1.5"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-zinc-400" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-sky-400" />
                    )}
                    <span className="hidden sm:inline text-[11px] text-zinc-400">
                      {isMuted ? 'Muted' : 'Audio On'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRestart}
                    aria-label="Restart video"
                    className="p-1.5 hover:text-sky-400 transition-colors hidden sm:block"
                    title="Replay from start"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  {/* Time Counter */}
                  <span className="text-[11px] text-zinc-400 tracking-wider">
                    <span className="text-white">{formatTime(currentTime)}</span>
                    <span className="mx-1 text-zinc-600">/</span>
                    <span>{formatTime(duration)}</span>
                  </span>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-3">
                  <span className="hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 uppercase tracking-widest">
                    <Activity className="w-3 h-3 text-sky-400" />
                    Stream Sync
                  </span>

                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    aria-label="Toggle Fullscreen"
                    className="p-1.5 hover:text-sky-400 transition-colors"
                  >
                    {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Badges / Highlights below Demo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="p-4 bg-zinc-900/60 border border-zinc-800/80 rounded-none flex items-start gap-3">
            <div className="p-2 bg-sky-950/60 border border-sky-400/30 text-sky-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                Zero-OOM Streaming
              </h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Constant memory batch chunking handles multi-gigabyte tables without host memory leaks.
              </p>
            </div>
          </div>

          <div className="p-4 bg-zinc-900/60 border border-zinc-800/80 rounded-none flex items-start gap-3">
            <div className="p-2 bg-sky-950/60 border border-sky-400/30 text-sky-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                AI Schema Synthesis
              </h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Infers target schema types and resolves column mappings automatically.
              </p>
            </div>
          </div>

          <div className="p-4 bg-zinc-900/60 border border-zinc-800/80 rounded-none flex items-start gap-3">
            <div className="p-2 bg-sky-950/60 border border-sky-400/30 text-sky-400">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                Real-Time Telemetry
              </h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                WebSocket-powered progress tracking with live row counts, rates, and error logs.
              </p>
            </div>
          </div>

          <div className="p-4 bg-zinc-900/60 border border-zinc-800/80 rounded-none flex items-start gap-3">
            <div className="p-2 bg-sky-950/60 border border-sky-400/30 text-sky-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                Local Docker Agent
              </h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Data never leaves your network perimeter. Run locally or in private VPCs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
