import { useSelector } from "react-redux";

const Dashboard = () => {

    // const { user } = useSelector((state) => {   // always make sure your selector function returns the state slice you need
    //     state = state.auth
    // })

    const { user } = useSelector(state => state.auth)  //  return implicitly.

    console.log(user);



    return (
        <div>
            Dashboard
        </div>
    )
}

export default Dashboard
