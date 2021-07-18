import { useState } from "react";

export default function Q2() {
  const [count, setCount] = useState(0);
  const updateState = async () => {
    setCount(count + 1);
    console.log("Boom");
  };

  return (
    <div>
      <button onClick={updateState}>State: {count}</button>
    </div>
  );
}
//
// export default class Q2 {
//   state = {
//     count: 0,
//   };
//   updateState = () => {
//     this.setState({
//       count: this.state.count + 1,
//     });
//   };
//   componentDidMount() {
//     console.log("Boom");
//   }
//   componentDidUpdate() {
//     console.log("Boom");
//   }
//   render() {
//     return (
//       <div>
//         <button onClick={this.updateState}>State: {this.state.count}</button>
//       </div>
//     );
//   }
// }
