export default function Statistics({ statistics }) {
  function PieChart(statisticsProp) {
    const freeScooters = parseInt(statisticsProp.freeScooters, 10) || 0;
    const busyScooters = parseInt(statisticsProp.busyScooters, 10) || 0;
    const total = freeScooters + busyScooters;

    if (total === 0) {
      return <svg width="200" height="200" viewBox="-100 -100 200 200"></svg>;
    }

    const freePercentage = (freeScooters / total) * 100;
    const busyPercentage = (busyScooters / total) * 100;

    const freeAngle = Math.round((freePercentage / 100) * 360);
    const busyAngle = Math.round((busyPercentage / 100) * 360);

    console.log("Free Scooters:", freeScooters);
    console.log("Busy Scooters:", busyScooters);
    console.log("Total:", total);
    console.log("Free Percentage:", freePercentage);
    console.log("Busy Percentage:", busyPercentage);
    console.log("Free Angle:", freeAngle);
    console.log("Busy Angle:", busyAngle);

    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
      const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
      };
    };

    const describeArc = (x, y, radius, startAngle, endAngle) => {
      const start = polarToCartesian(x, y, radius, endAngle);
      const end = polarToCartesian(x, y, radius, startAngle);
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      const d = [
        "M",
        start.x,
        start.y,
        "A",
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y,
        "L",
        x,
        y,
        "Z",
      ].join(" ");
      return d;
    };

    return (
      <svg width="200" height="200" viewBox="-100 -100 200 200">
        {freeAngle === 360 ? (
          <circle cx="0" cy="0" r="100" fill="#36A2EB" />
        ) : busyAngle === 360 ? (
          <circle cx="0" cy="0" r="100" fill="#FF6384" />
        ) : (
          <>
            <path d={describeArc(0, 0, 100, 0, freeAngle)} fill="#36A2EB" />
            <path d={describeArc(0, 0, 100, freeAngle, 360)} fill="#FF6384" />
          </>
        )}
      </svg>
    );
  }

  return (
    <div>
      {PieChart(statistics)}
      <div className="busy">Busy</div>
      <div className="free">Free</div>
    </div>
  );
}
