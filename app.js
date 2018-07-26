const $ = document.querySelector.bind(document);
const sprite = $("#sprite");
const meterContainer = $("#meter-container");
const meter = $("#meter");

const powerLevels = {
  100: {
    current: "base",
    next: "ssj"
  }
};

const fillMeter = level => {
  const limit = 100;
  if (level >= limit) {
    return;
  }
  const containerWidth = meterContainer.offsetWidth;
  const newWidth = (level / limit) * containerWidth;
  meter.style.width = `${newWidth}px`;
};

const main = () => {
  const { fromEvent } = rxjs;
  const { filter, map, scan, tap } = rxjs.operators;
  const begin = fromEvent(document, "keydown");
  const end = fromEvent(document, "keyup");
  begin
    .pipe(
      scan(level => level + 1, 1),
      tap(level => {
        console.log({ level });
        sprite.classList.add("powerup");
        fillMeter(level);
      }),
      map(level => powerLevels[level]),
      filter(level => level && level.next)
    )
    .subscribe(({ current, next }) => {
      sprite.classList.remove(current);
      sprite.classList.add(next);
    });
};
main();
