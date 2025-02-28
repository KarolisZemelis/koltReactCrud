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

    // Nested Helper Functions
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
        <defs>
          <linearGradient id="freeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#48BB78", stopOpacity: 1 }} // Use $success color
            />
            <stop
              offset="100%"
              style={{ stopColor: "#38A169", stopOpacity: 1 }} // Darker shade of $success
            />
          </linearGradient>
          <linearGradient id="busyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#E53E3E", stopOpacity: 1 }} // Use $danger color
            />
            <stop
              offset="100%"
              style={{ stopColor: "#C53030", stopOpacity: 1 }} // Darker shade of $danger
            />
          </linearGradient>
        </defs>
        <g style={{ filter: "drop-shadow(2px 2px 2px #363636)" }}>
          {freeAngle === 360 ? (
            <circle cx="0" cy="0" r="100" fill="url(#freeGradient)" />
          ) : busyAngle === 360 ? (
            <circle cx="0" cy="0" r="100" fill="url(#busyGradient)" />
          ) : (
            <>
              <path
                d={describeArc(0, 0, 100, 0, freeAngle)}
                fill="url(#freeGradient)"
              />
              <path
                d={describeArc(0, 0, 100, freeAngle, 360)}
                fill="url(#busyGradient)"
              />
            </>
          )}
        </g>
        {/* Free Percentage Label and Line */}
        <text
          {...polarToCartesian(0, 15, 130, freeAngle / 2)}
          textAnchor="middle"
          fontSize="16"
          fontFamily="Arial"
          fill="black"
        >
          {parseFloat(freePercentage).toFixed(2)}%
        </text>

        {/* Busy Percentage Label and Line */}
        <text
          {...polarToCartesian(0, -15, 130, freeAngle + busyAngle / 2)}
          textAnchor="middle"
          fontSize="16"
          fontFamily="Arial"
          fill="black"
        >
          {parseFloat(busyPercentage).toFixed(2)}%
        </text>
      </svg>
    );
  }

  return (
    <div className="statisticContainer">
      <div className="statisticsTable">
        <p>
          Iš viso paspirtukų: <b>{statistics.totalScooters}</b>
        </p>
        <p>
          Iš viso laisvų paspirtukų: <b>{statistics.freeScooters}</b>
        </p>
        <p>
          Iš viso užimtų paspirtukų: <b>{statistics.busyScooters}</b>
        </p>
        <p>
          Iš viso nuvažiuota kilometrų: <b>{statistics.totalRideKilometers}</b>{" "}
          km
        </p>
      </div>
      <div className="pieChart">
        {PieChart(statistics)}
        <div className="legend">
          <div>
            Rezervuoti <div className="busy"></div>
          </div>
          <div>
            Laisvi <div className="free"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
