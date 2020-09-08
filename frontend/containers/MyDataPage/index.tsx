import React from "react";
import {
  IGetPaginatedPublicationsResponse,
  IPublication,
} from "../../utils/api";
import { Text } from "../../typography";
import { ScrollToTop } from "../../components/ScrollToTop";
import { getSecrets } from "../../config";
import { DATA_PAGE, truncate } from "../../utils/strings";

import dayjs from "dayjs";
import { RouteComponentProps } from "react-router-dom";
import { useApi, useRouter, useViewport } from "../../hooks";
import { Loading } from "../../components/Loading";
import { Image, Column, Row, Box } from "../../base";
import { Card } from "../../components/Card";
import { theme } from "../../utils/theme";
import { BackButton } from "../../components/BackButton";


// const MyDataPage: React.FC = () => {
//   return (
//     <>
//       <ScrollToTop />
//                 <Text
//                   fontSize={32}
//                   lineHeight={42}
//                   fontWeight={500}
//                   style={{
//                     maxWidth: 509,
//                     paddingBottom: 25,
//                   }}
//                 >
//                   This is a page with only static values.
//                   Nothing is gotten from database.
//                 </Text>
//         </>
//   );
// };



const { NODE_ENV } = getSecrets();
const PRODUCTION_MODE = NODE_ENV === "production";

interface IProps {
  paginatedPublications?: IGetPaginatedPublicationsResponse;
  blogPost?: IPublication;
}

const MyDataPage: React.FC<IProps> = ({ paginatedPublications, blogPost }) => {
  const [data, setData] = React.useState<IGetPaginatedPublicationsResponse>();
  const [isLoading, setIsLoading] = React.useState(false);
  const { getPaginatedPublications } = useApi();

  React.useEffect(() => {
    getData();
  }, []);

  const { TITLE, READ_MORE } = DATA_PAGE;

  const getData = async (args?: {
    querystring?: string;
    page?: number;
    filter?: { title?: string; tags?: string[] };
  }) => {
    setIsLoading(true);
    setData(await getPaginatedPublications(args));
    setIsLoading(false);
  };

  return (
    <>
    {isLoading && <Loading height={"100vh"} width={"100vw"} />}
    {!isLoading && data && (
      <>
      {typeof data === "string" ? (
        <h1>{data}</h1>
      ) : (
        data.count > 0 &&
        data.results.map((blogPost, i) => {
            return (
              <>
              <ScrollToTop />
                        <Text
                          fontSize={32}
                          lineHeight={42}
                          fontWeight={500}
                          style={{
                            maxWidth: 509,
                            paddingBottom: 25,
                          }}
                        >
                          {blogPost.title}
                        </Text>
                </>
            );
          })
        )}
        </>
      )}
    </>
  );
};

export { MyDataPage as default };
