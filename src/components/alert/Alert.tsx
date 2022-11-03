import { useSelector } from "react-redux";
import { alertSelector } from "../../redux/selector/selectors";
import Loading from "./Loading";

import Toast from "./Toast";

const Alert = () => {
  const { alerts } = useSelector(alertSelector);

  return (
    <div>
      {alerts.loading && <Loading />}
      {alerts.success && <Toast title="success" body={alerts.success} />}

      {alerts.error && <Toast title="error" body={alerts.error} />}
    </div>
  );
};

export default Alert;
