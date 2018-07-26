const $ = document.querySelector.bind(document);
const sprite = $("#sprite");
const meterContainer = $("#meter-container");
const meter = $("#meter");

const saiyanLevels = [
  {
    class: "base",
    label: "Normal form",
    powerLevel: {
      min: 0,
      max: 99
    }
  },
  {
    class: "ssj",
    label: "SSJ form",
    powerLevel: {
      min: 100,
      max: 999
    }
  }
];

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
        sprite.classList.add("powerup");
        fillMeter(level);
      }),
      map(level =>
        saiyanLevels.find(function(saiyanLevel) {
          return (
            level >= saiyanLevel.powerLevel.min &&
            level <= saiyanLevel.powerLevel.max
          );
        })
      )
    )
    .subscribe(saiyanLevel => {
      saiyanLevels.forEach(slevel => {
        sprite.classList.remove(slevel.class);
      });

      sprite.classList.add(saiyanLevel.class);
    });

  end.subscribe(() => {
    sprite.classList.remove("powerup");
  });
};
main();
