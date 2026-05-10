import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class WebGLErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(): State { return { hasError: true }; }
  componentDidCatch() {}
  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}

let _cachedWebGL: boolean | null = null;
export function isWebGLAvailable(): boolean {
  if (_cachedWebGL !== null) return _cachedWebGL;
  try {
    const canvas = document.createElement("canvas");
    _cachedWebGL = !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      (canvas.getContext as (id: string) => RenderingContext | null)("experimental-webgl")
    );
  } catch {
    _cachedWebGL = false;
  }
  return _cachedWebGL;
}
