


### 프로젝트를 실행시킬때 사용되는 명령어:
```sh
# start the Client
npm start

# start the Server
python manage.py runserver
```

### 새로운 페이지 생성하는 방법
1. `frontend > containers` 디렉토리에 새로운 폴더를 생성하고 하위에 `index.tsx`를 생성한다.
2. `index.tsx`을 수정한다.
3. `frontend > routes > index.ts`에 추가된 페이지의 경로를 추가한다.
    ```typescript
        export enum ROUTES {
            .
            .
            .
        CVAT_TASKLIST = "/cvat-tasklist",
        }
    ```
    - `CVAT_TASKLIST`는 내가 지정해주는 이름이다.
    - `cvat-tasklist`는 새롭게 만든 폴더의 이름이어야 한다.
4. `frontend > containers > Routes > index.tsx`를 수정해 준다.
    ```typescript
        const cvatTaskList = loadable(() => import("../cvat-tasklist"), {
        ssr: true,
        fallback: <Loading height={"100vh"} width={"100vw"} />,
        });
    ```
    ```typescript
        export const Routes = () => {
        const { history } = useRouter();

        return (
                .
                .
                .
            <Route
                path={ROUTES.CVAT_TASKLIST}
                exact
                component={cvatTaskList}
            />
                .
                .
                .
            );
        };
    ```
5. `frontend > urls.py`을 수정해준다.
    ```python
        urlpatterns = [
        re_path(r'^biography$|^blog$|^mypage$|^mydatapage$|^cvattasklist$|^$', views.index, name='frontend'),
        re_path(r'^blog/(?P<string>.+)$|^$', views.blog_post, name='frontend'),
        # path('mypage', views.mypage, name='frontend')
    ]
    ```
6. `frontend > components > Headers > Nav > index.tsx`를 수정해준다.
    ```typescript
        export const Nav: React.FC<IProps> = ({ pinned }) => {
            .
            .
            .
            return (
                .
                .
                .
                <Text
                fontSize={18}
                lineHeight={25}
                style={{
                    cursor: "pointer",
                    margin: "0px 16px",
                    display: "flex",
                    alignItems: "center",
                    color: theme.color.white1,
                    whiteSpace: "nowrap",
                    fontWeight:
                    history.location.pathname === ROUTES.CVAT_TASKLIST
                        ? "bold"
                        : "normal",
                }}
                onClick={() => {
                    setIsOpen(false);
                    push(ROUTES.CVAT_TASKLIST);
                }}
                >
                CVAT Task List
                </Text>
                    .
                    .
                    .
            );
        };
    ```