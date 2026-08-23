// ============================================================================
// Python-side bootstrap for the lab runtime.
//
// Installed once per Pyodide instance. It gives student code the behaviour they
// expect from a desktop interpreter or a notebook cell:
//
//   * matplotlib figures are captured as PNGs, whether or not plt.show() is called
//   * tracebacks point at the student's own line numbers, with source shown
//   * a trailing bare expression echoes its value, like a REPL
//   * notebook-only syntax (%magics, !shell) is stripped instead of crashing
//   * display() and pandas frames render without extra imports
// ============================================================================

export const PYTHON_PREAMBLE = String.raw`
import sys, io, base64, builtins, linecache, traceback, warnings

import matplotlib
matplotlib.use("AGG")
import matplotlib.pyplot as plt

_LAB_FILENAME = "<experiment>"
_lab_figures = []
_lab_user_ns = {"__name__": "__main__", "__doc__": None}

warnings.simplefilter("once")
# Raised by matplotlib's own tight-bbox machinery; nothing a student can act on.
warnings.filterwarnings("ignore", category=matplotlib.MatplotlibDeprecationWarning)
# Emitted by threadpoolctl probing the Pyodide loader, not by student code.
warnings.filterwarnings("ignore", message=".*as_object_map.*")


def _lab_capture_figures():
    for num in plt.get_fignums():
        fig = plt.figure(num)
        if not fig.get_axes():
            continue
        buf = io.BytesIO()
        fig.savefig(buf, format="png", dpi=110, bbox_inches="tight", facecolor=fig.get_facecolor())
        _lab_figures.append(base64.b64encode(buf.getvalue()).decode("ascii"))
        buf.close()
    plt.close("all")


plt.show = lambda *args, **kwargs: _lab_capture_figures()


def _lab_display(value):
    """Notebook-style display(): rich repr when available, else print."""
    if value is None:
        return
    if hasattr(value, "to_string"):  # pandas DataFrame / Series
        print(value.to_string())
    else:
        print(repr(value))


builtins.display = _lab_display


def _lab_input(prompt=""):
    raise RuntimeError(
        "input() is not available in the browser lab. "
        "Assign the value directly instead, e.g.  n = 5"
    )


builtins.input = _lab_input


def _lab_strip_notebook_syntax(src):
    """Drops IPython magics and shell escapes so notebook copy-paste still runs."""
    lines, removed = [], []
    for line in src.split("\n"):
        stripped = line.lstrip()
        if stripped.startswith(("%", "!")) and not stripped.startswith("%%"):
            removed.append(stripped)
            lines.append("")
        elif stripped.startswith("%%"):
            removed.append(stripped)
            lines.append("")
        else:
            lines.append(line)
    return "\n".join(lines), removed


def _lab_format_exception(exc):
    """Trims runtime frames so the traceback starts at the student's code."""
    tb = exc.__traceback__
    while tb is not None and tb.tb_frame.f_code.co_filename != _LAB_FILENAME:
        tb = tb.tb_next
    if tb is None:
        return "".join(traceback.format_exception_only(type(exc), exc)).strip()
    return "".join(traceback.format_exception(type(exc), exc, tb)).strip()


async def _lab_run(src):
    """Executes one submission. Returns (stdout-visible result, error text)."""
    from pyodide.code import eval_code_async

    _lab_figures.clear()
    plt.close("all")

    src, removed = _lab_strip_notebook_syntax(src)
    for line in removed:
        print(f"[lab] ignored notebook-only line: {line}", file=sys.stderr)

    linecache.cache[_LAB_FILENAME] = (len(src), None, src.splitlines(True), _LAB_FILENAME)

    error = None
    try:
        result = await eval_code_async(
            src,
            globals=_lab_user_ns,
            return_mode="last_expr",
            quiet_trailing_semicolon=True,
            filename=_LAB_FILENAME,
        )
        if result is not None:
            _lab_display(result)
    except BaseException as exc:  # noqa: BLE001 - surfaced verbatim to the student
        error = _lab_format_exception(exc)

    # Figures the student built but never called plt.show() on still count.
    _lab_capture_figures()
    return error


def _lab_reset_namespace():
    _lab_user_ns.clear()
    _lab_user_ns.update({"__name__": "__main__", "__doc__": None})
`;
