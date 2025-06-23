import _ from "lodash";

interface WayParsingProps {
  text: string;
  className?: string;
}

export function WayParsing({ text, className = "" }: WayParsingProps) {
  const parts = _.split(text, " > ");
  
  return (
    <div className={`break-words leading-relaxed ${className}`}>
      <span>{_.head(parts)}</span>
      {_.tail(parts)
        .map((part, idx) => (
        <span
          key={idx}
          className="inline-block break-keep"
        >
          {" > "}{part}
        </span>
      ))}
    </div>
  );
}