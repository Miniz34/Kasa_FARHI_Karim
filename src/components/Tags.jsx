import styled from "styled-components";
import colors from "../utils/styles/colors";

const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  gap: 20px;
`;

const TagsSingle = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: center;
  padding: 10px 0px 10px 0px;
  border-radius: 10px;
  width: 150px;

  background-color: ${colors.primary};
  color: ${colors.textcards};
`;

function Tags(props, text) {
  const { tags } = props;
  console.log(tags[0]);

  return (
    <TagsContainer>
      {tags.map((tag, index) => (
        <TagsSingle key={`${index}`}> {tag}</TagsSingle>
      ))}
      {/* <CardContainer>
        {data.map((home, index) => (
          <Card key={`${home.id}-${index}`} id={home.id} title={home.title} />
        ))}
      </CardContainer> */}
    </TagsContainer>
  );
}

export default Tags;
