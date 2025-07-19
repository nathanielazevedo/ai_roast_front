function ModeSelector({ mode, setMode }: any) {
  return (
    <div>
      <button
        onClick={() => setMode("mentor")}
        className={mode === "mentor" ? "selected" : ""}
      >
        Mentor Mode
      </button>

      <button
        onClick={() => setMode("drill")}
        className={mode === "drill" ? "selected" : ""}
      >
        Drill Sergeant Mode
      </button>
    </div>
  );
}

export default ModeSelector;
