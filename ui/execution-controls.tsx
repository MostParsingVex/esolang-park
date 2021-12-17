import {
  Button,
  ButtonGroup,
  Icon,
  NumericInput,
  Tag,
} from "@blueprintjs/core";

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    paddingRight: 5,
    marginRight: -15,
  },
  inputWrapper: {
    /**
     * As of Dec'21, NumericInput doesn't have `small` prop yet,
     * so we instead use `transform` to hack up a smaller input.
     */
    transform: "scale(0.8)",
  },
  input: {
    width: 125,
  },
};

/** Input field for changing execution interval */
const IntervalInput = (props: {
  disabled: boolean;
  onChange: (v: number) => void;
}) => {
  return (
    <div style={styles.inputWrapper}>
      <NumericInput
        min={5}
        stepSize={5}
        defaultValue={20}
        minorStepSize={null}
        leftIcon="time"
        clampValueOnBlur
        style={styles.input}
        disabled={props.disabled}
        onValueChange={(v) => props.onChange(v)}
        rightElement={<Tag minimal>ms</Tag>}
        allowNumericCharactersOnly
      />
    </div>
  );
};

/** Button for starting code execution */
const RunButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    small
    onClick={onClick}
    rightIcon={<Icon icon="play" intent="success" />}
  >
    Run code
  </Button>
);

/** Button group for debugging controls */
const DebugControls = (props: {
  paused: boolean;
  onPause: () => void;
  onResume: () => void;
  onStep: () => void;
  onStop: () => void;
}) => {
  return (
    <ButtonGroup>
      <Button
        small
        title={props.paused ? "Pause" : "Resume"}
        onClick={props.paused ? props.onResume : props.onPause}
        icon={<Icon icon={props.paused ? "play" : "pause"} intent="primary" />}
      />
      <Button
        small
        title="Step"
        onClick={props.onStep}
        disabled={!props.paused}
        icon={<Icon icon="step-forward" intent="warning" />}
      />
      <Button
        small
        title="Stop"
        onClick={props.onStop}
        icon={<Icon icon="stop" intent="danger" />}
      />
    </ButtonGroup>
  );
};

type Props = {
  state: "off" | "running" | "paused";
  onRun: () => void;
  onPause: () => void;
  onResume: () => void;
  onStep: () => void;
  onStop: () => void;
  onChangeInterval: (value: number) => void;
};

export const ExecutionControls = (props: Props) => {
  return (
    <div style={styles.container}>
      {props.state === "off" ? (
        <RunButton onClick={props.onRun} />
      ) : (
        <DebugControls
          paused={props.state === "paused"}
          onPause={props.onPause}
          onResume={props.onResume}
          onStep={props.onStep}
          onStop={props.onStop}
        />
      )}
      <IntervalInput
        disabled={props.state === "running"}
        onChange={props.onChangeInterval}
      />
    </div>
  );
};
