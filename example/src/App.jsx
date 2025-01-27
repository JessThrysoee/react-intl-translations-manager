import { useState } from "react";
import { defineMessages, useIntl } from "react-intl";

const t = defineMessages({
  helloWorld: {
    id: "hello_world",
    description: "A greeting to the world",
    defaultMessage: "Hello {name}",
  },
  name: {
    id: "hello_name",
    description: "Name input field placeholder",
    defaultMessage: "Your name",
  },
});

const App = () => {
  const intl = useIntl();
  const [name, setName] = useState("?");
  return (
    <>
      <div>
        <span>{intl.formatMessage(t.name)}</span> :
        <input type="text" onChange={(e) => setName(e.target.value)} placeholder={intl.formatMessage(t.name)} />
      </div>
      <div>{intl.formatMessage(t.helloWorld, { name })}</div>
    </>
  );
};

export { App };
