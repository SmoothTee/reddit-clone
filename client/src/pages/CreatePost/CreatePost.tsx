import "react-quill/dist/quill.snow.css";

import React, { useEffect, useState, FormEvent } from "react";
import Select, { ValueType } from "react-select";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";
import { useDispatch } from "react-redux";

import styles from "./CreatePost.module.css";
import { readCommunitiesAction } from "../../redux/community/actions";
import { useTypedSelector } from "../../redux/hooks";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { createPostAction } from "../../redux/post/actions";
import { useHistory, useLocation } from "react-router-dom";

type OptionType = { label: string; value: number };

export const CreatePost = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const location = useLocation();

  const next = new URLSearchParams(location.search).get("next");

  const [selectedCommunity, setSelectedCommunity] = useState<OptionType | null>(
    null
  );
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const communities = useTypedSelector((state) => state.community.items);
  const communityEntities = useTypedSelector(
    (state) => state.entities.communities
  );

  useEffect(() => {
    dispatch(readCommunitiesAction());
  }, [dispatch]);

  const options = communities.map((cId) => {
    const c = communityEntities.byId[cId];

    return {
      value: c.id,
      label: c.name,
    };
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(
      createPostAction(
        {
          community_id: (selectedCommunity as OptionType).value,
          title,
          body: DOMPurify.sanitize(body),
        },
        () => {
          history.push(next ? next : "/");
        }
      )
    );
  };

  return (
    <div className={styles.container}>
      <form className={styles.center_wrapper} onSubmit={handleSubmit}>
        <Select
          isClearable={true}
          isSearchable={true}
          name="communities"
          options={options}
          defaultValue={selectedCommunity}
          placeholder="Choose Community..."
          onChange={(selectedOption: ValueType<OptionType>) => {
            setSelectedCommunity(selectedOption as OptionType);
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: "var(--yellow)",
              primary: "var(--yellow)",
            },
          })}
          styles={{
            control: (base) => ({
              ...base,
              boxShadow: "none",
            }),
          }}
        />
        <Input
          label="Title"
          name="title"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
        <ReactQuill theme="snow" value={body} onChange={setBody} />
        <Button type="submit" disabled={!selectedCommunity || !title}>
          Create Post
        </Button>
      </form>
    </div>
  );
};
