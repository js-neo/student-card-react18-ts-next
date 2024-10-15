import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

const IconCache: React.FC = React.memo(() => {
    return <FontAwesomeIcon icon={faRedo} />;
});

IconCache.displayName = "IconCache";

export default IconCache;
