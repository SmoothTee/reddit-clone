import React from "react";
import { Link } from "react-router-dom";

import styles from "./CommunityCard.module.css";
import { Button } from "../Button";
import { useDispatch } from "react-redux";
import { joinCommunityAction } from "../../redux/community/actions";

interface CommunityCardProps {
  id: number;
  name: string;
  numOfMembers: number;
}

export const CommunityCard = ({
  id,
  name,
  numOfMembers,
}: CommunityCardProps) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <Link to={`/r/${name}`} className={styles.name}>
        /r/{name}
      </Link>
      <span className={styles.members}>
        {numOfMembers} member{numOfMembers !== 1 ? "s" : ""}
      </span>
      <Button onClick={() => dispatch(joinCommunityAction(id))}>Join</Button>
    </div>
  );
};
