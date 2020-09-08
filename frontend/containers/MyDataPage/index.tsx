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
import { Header } from "../../components/Header";


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
  const { width } = useViewport();

  React.useEffect(() => {
    getData();
  }, []);

  const { TITLE, READ_MORE } = DATA_PAGE;
  const FIRST_PUBLICATION_BREAKPOINT = 995;
  const FIRST_PUBLICATION_SECONDARY_BREAKPOINT = 870;
  const FIRST_PUBLICATION_TERTIARY_BREAKPOINT = 500;
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
    <Row>
      <Column
        style={{
          minWidth:
            width < FIRST_PUBLICATION_BREAKPOINT
              ? 318
              : width <
                FIRST_PUBLICATION_SECONDARY_BREAKPOINT
              ? "auto"
              : "calc(100% + 32px)",
          marginLeft:
            width < FIRST_PUBLICATION_SECONDARY_BREAKPOINT
              ? 0
              : -26,
          position: "relative",
        }}
      >
        <Text
          fontSize={32}
          lineHeight={42}
          fontWeight={500}
          style={{
            maxWidth: 509,
            paddingBottom: 25,
            color: 'red',
          }}
        >
            Title
        </Text>
      </Column>
      <Column
        style={{
          minWidth:
            width < FIRST_PUBLICATION_BREAKPOINT
              ? 318
              : width <
                FIRST_PUBLICATION_SECONDARY_BREAKPOINT
              ? "auto"
              : "calc(100% + 32px)",
          marginLeft:
            width < FIRST_PUBLICATION_SECONDARY_BREAKPOINT
              ? 0
              : -26,
          position: "relative",
        }}
      >
        <Text
          fontSize={32}
          lineHeight={42}
          fontWeight={500}
          style={{
            maxWidth: 509,
            paddingBottom: 25,
            color: 'red',
          }}
        >
            Body
        </Text>
      </Column>
    </Row>
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
                <Row>
                    <Column
                      style={{
                        minWidth:
                          width < FIRST_PUBLICATION_BREAKPOINT
                            ? 318
                            : width <
                              FIRST_PUBLICATION_SECONDARY_BREAKPOINT
                            ? "auto"
                            : "calc(100% + 32px)",
                        marginLeft:
                          width < FIRST_PUBLICATION_SECONDARY_BREAKPOINT
                            ? 0
                            : -26,
                        position: "relative",
                      }}
                    >
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
                    </Column>
                    <Column
                      style={{
                        minWidth:
                          width < FIRST_PUBLICATION_BREAKPOINT
                            ? 318
                            : width <
                              FIRST_PUBLICATION_SECONDARY_BREAKPOINT
                            ? "auto"
                            : "calc(100% + 32px)",
                        marginLeft:
                          width < FIRST_PUBLICATION_SECONDARY_BREAKPOINT
                            ? 0
                            : -26,
                        position: "relative",
                      }}
                    >
                      <Text
                        fontSize={32}
                        lineHeight={42}
                        fontWeight={500}
                        style={{
                          maxWidth: 509,
                          paddingBottom: 25,
                        }}
                      >
                          {blogPost.body}
                      </Text>
                    </Column>
                  </Row>
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
