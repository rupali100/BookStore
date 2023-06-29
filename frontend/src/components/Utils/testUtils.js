// eslint-disable-next-line import/no-extraneous-dependencies
import { ThemeProvider } from "@mui/styles";
import { render } from "@testing-library/react";
import { rest } from "msw";
import { QueryClient, QueryClientProvider } from "react-query";
import theme from "../styles/theme";

// https://stackoverflow.com/questions/56216709/how-to-inject-material-ui-stylesheets-into-a-jest-react-testing-library-test
export function mockStyleInjection() {
  const defaultInsertRule = window.CSSStyleSheet.prototype.insertRule;
  window.CSSStyleSheet.prototype.insertRule = function insertRuleFn(
    rule,
    index
  ) {
    const styleElement = document.createElement("style");
    const textNode = document.createTextNode(rule);
    styleElement.appendChild(textNode);
    document.head.appendChild(styleElement);
    return defaultInsertRule.bind(this)(rule, index);
  };
  // cleanup function, which reinserts the head and cleans up method overwrite
  return function applyJSSRules() {
    window.CSSStyleSheet.prototype.insertRule = defaultInsertRule;
  };
}

// render with mockstyle injection
export function applyJSSAndRender(
  component,
  renderFn = render,
  renderOptions = {}
) {
  const applyJSSRules = mockStyleInjection();
  const queryClient = new QueryClient();
  const result = renderFn(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    </ThemeProvider>,
    {
      ...renderOptions,
    }
  );
  applyJSSRules();
  return result;
}

export function createReactQueryWrapper() {
  const queryClient = new QueryClient();
  // eslint-disable-next-line react/prop-types
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export function renderWithClient(ui) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>
      ),
  };
}

