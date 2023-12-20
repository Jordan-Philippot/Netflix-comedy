import styled from "styled-components";
import { COLOR_BLUE } from "utils/colors";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { ChannelData } from "api/channel.type";
import { setSearchResult, setSearchText } from "redux/video";
import { useState } from "react";

// ----------
// Component
// ----------
import type { InputProps } from "components/ui/Input";
import Search from "components/icon/Search";
import Cross from "components/icon/Cross";

interface ExtendedInputProps extends InputProps {
  hasSearch: boolean;
}

const StyledSearchInputContainer = styled.div`
  display: block;
  width: 200px;
  overflow: hidden;
`;
const StyledSearchInput = styled.input<ExtendedInputProps>`
  display: block;
  position: relative;
  width: 100%;
  right: ${(props) => (props.hasSearch ? 0 : "-100%")};
  padding: ${(props) => (props.hasSearch ? "10px 15px" : "0")};
  border: none; /* Assure-toi que la bordure est nulle si nécessaire */
  transition: all 0.7s ease;
  box-sizing: border-box;
  overflow: hidden;
  height: 35px;
  border-radius: 2px;
  :active,
  :focus {
    outline: none;
    border: 1px solid ${COLOR_BLUE};
  }
`;
const StyledSearchContainer = styled.div`
  margin: auto 15px;
  cursor: pointer;
  svg {
    width: 22px;
    height: 22px;
  }
`;
export default function SearchInput() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const [hasSearch, setHasSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  
  const channelsData = queryClient.getQueryData(["channels"]) as ChannelData[];

  const checkSearchBar = () => {
    if (hasSearch) {
      setSearch("");
      dispatch(setSearchResult([]));
      dispatch(setSearchText(""));
    }
    setHasSearch((prev) => !prev);
  };
  
  const setSearchAndResult = (e: string) => {
    dispatch(setSearchText(e));
    setSearch(e);
    if (e.length === 0) {
      dispatch(setSearchResult([]));
      return;
    }
    const valueLowerCase = e.toLowerCase();

    channelsData.forEach((channel) => {
      const filteredResults = channel.videos.filter((video) => {
        let tagsMatch = false;

        const titleMatch = video.title.toLowerCase().includes(valueLowerCase);
        const descriptionMatch = video.description
          ?.toLowerCase()
          .includes(valueLowerCase);

        if (video.tags)
          video.tags.forEach((tag) => {
            tagsMatch = tag?.toLowerCase().includes(valueLowerCase);
          });

        return titleMatch || descriptionMatch || tagsMatch;
      });
      dispatch(setSearchResult(filteredResults));
    });
  };

  return (
    <>
      <StyledSearchInputContainer>
        <StyledSearchInput
          onChange={(e) => setSearchAndResult(e.target.value)}
          placeholder="Titre, Genre, Description..."
          type="text"
          hasSearch={hasSearch}
          value={search}
        />
      </StyledSearchInputContainer>
      <StyledSearchContainer onClick={checkSearchBar}>
        {hasSearch ? <Cross /> : <Search />}
      </StyledSearchContainer>
    </>
  );
}
