import { STRATEGY } from "./constant";
import Wrapper from "./Wrapper";

const myPermissions = {
  Roster: ["Create", "Read"],
  Company: ["Delete1"],
  Trip: ["Create1", "Delete"],
};

const allowedPermission = {
  Roster: ["Create"],
  Company: ["Delete"],
  Trip: ["Create", "Delete"],
};

const One = () => {
  return (
    <div>
      <Wrapper
        myPermissions={myPermissions}
        allowedPermission={allowedPermission}
        // strategy={STRATEGY.ANY}
        // strategy={STRATEGY.ALL}
        strategy={STRATEGY.THRESHOLD}
        threshold={2}
        // strategy={"ABC"}
        // fallback={
        //   <div style={{ color: "orange" }}>Oops! Something went wrong.</div>
        // }
      >
        <div>You have access!</div>
      </Wrapper>
      <h1>Vikas</h1>
    </div>
  );
};

export default One;
