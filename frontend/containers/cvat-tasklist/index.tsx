import React from "react";
import dayjs from "dayjs";
import { RouteComponentProps } from "react-router-dom";
import { useApi, useRouter, useViewport } from "../../hooks";
import { Loading } from "../../components/Loading";
import { IPublication } from "../../utils/api";
import { Image, Column, Row, Box } from "../../base";
import { Card } from "../../components/Card";
import { Text } from "../../typography";
import { theme } from "../../utils/theme";
import { ScrollToTop } from "../../components/ScrollToTop";
import { BackButton } from "../../components/BackButton";


const MyPage: React.FC = () => {
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
                  This is a page with only static values.
                  Nothing is gotten from database.
                </Text>
        </>
  );
};

export { MyPage as default };
