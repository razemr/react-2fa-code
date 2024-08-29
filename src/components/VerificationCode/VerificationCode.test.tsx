import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import VerificationCode from "./VerificationCode";
import { VerificationCodeProps } from "./types";

describe("Verification Code", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (
    props: VerificationCodeProps = {}
  ): HTMLInputElement[] => {
    render(<VerificationCode {...props} />);
    return screen.getAllByRole("textbox");
  };

  const getText = (inputs: HTMLInputElement[]): string => {
    let code = "";
    inputs.forEach((input) => {
      code = code + input.value;
    });

    return code;
  };

  describe("when rendered", () => {
    it("should display 4 empty inputs", () => {
      const inputs = renderComponent();

      expect(inputs).toHaveLength(4);
      inputs.forEach((input) => {
        expect(input).toHaveValue("");
      });
    });

    it("should display 6 empty inputs", () => {
      const inputs = renderComponent({ length: 6 });

      expect(inputs).toHaveLength(6);
      inputs.forEach((input) => {
        expect(input).toHaveValue("");
      });
    });

    it("should enable only the first input", () => {
      const inputs = renderComponent();

      expect(inputs[0]).toBeEnabled();
      for (let i = 1; i < inputs.length; i++) {
        expect(inputs[i]).toBeDisabled();
      }
    });
  });

  describe("when character is entered", () => {
    it("should accept valid character", async () => {
      const inputs = renderComponent();
      await userEvent.type(inputs[0]!, "a");

      expect(inputs[0]).toHaveValue("a");
    });

    it("should disable current input", async () => {
      const inputs = renderComponent();
      await userEvent.type(inputs[0]!, "a");

      expect(inputs[0]).toBeDisabled();
    });

    it("should remove focus from current input", async () => {
      const inputs = renderComponent();
      await userEvent.type(inputs[0]!, "a");

      expect(inputs[0]).not.toHaveFocus();
    });

    it("should enable next input", async () => {
      const inputs = renderComponent();
      await userEvent.type(inputs[0]!, "a");

      expect(inputs[1]).toBeEnabled();
    });

    it("should focus next input", async () => {
      const inputs = renderComponent();
      await userEvent.type(inputs[0]!, "a");

      expect(inputs[1]).toHaveFocus();
    });

    it("should not allow invalid character", async () => {
      const inputs = renderComponent({ pattern: /^\d+$/});
      await userEvent.type(inputs[0]!, "W");

      expect(inputs[0]).toHaveValue("");
    });

    it("should not disable input if character is invalid", async () => {
      const inputs = renderComponent({ pattern: /^\d+$/});
      await userEvent.type(inputs[0]!, "W");

      expect(inputs[0]).toBeEnabled();
    });

    it("should not remove focus from input if character is invalid", async () => {
      const inputs = renderComponent({ pattern: /^\d+$/});
      await userEvent.type(inputs[0]!, "W");

      expect(inputs[0]).toHaveFocus();
    });

    it("should allow one character per input", async () => {
      const inputs = renderComponent();
      await userEvent.type(inputs[0]!, "1234");

      inputs.forEach((input) => {
        expect(input.value.length).toBe(1);
      });
    });

    it("should allow letters, digits, and special characters", async () => {
      const inputs = renderComponent();
      await userEvent.type(inputs[0]!, "aA1/");

      expect(getText(inputs)).toBe("aA1/");
    });

    it("should only allow numbers", async () => {
      const inputs = renderComponent({ pattern: /^\d+$/ });
      await userEvent.type(inputs[0]!, "w1q3");

      expect(getText(inputs)).toBe("13");
    });

    it("should only allow letters", async () => {
      const inputs = renderComponent({ pattern: /^[a-zA-Z]+$/ });
      await userEvent.type(inputs[0]!, "w1Q3");

      expect(getText(inputs)).toBe("wQ");
    });

    it("should trigger onChange", async () => {
      const handleOnChangeMock = jest.fn();

      render(<VerificationCode onChange={handleOnChangeMock} />);

      await userEvent.type(screen.getAllByRole("textbox")[0]!, "12");

      expect(handleOnChangeMock).toHaveBeenCalledTimes(2);
      expect(handleOnChangeMock).toHaveBeenCalledWith("1");
      expect(handleOnChangeMock).toHaveBeenCalledWith("12");
    });

    it("should trigger onComplete", async () => {
      const handleOnCompleteMock = jest.fn();

      render(<VerificationCode onComplete={handleOnCompleteMock} />);

      await userEvent.type(screen.getAllByRole("textbox")[0]!, "1234");

      expect(handleOnCompleteMock).toHaveBeenCalledTimes(1);
      expect(handleOnCompleteMock).toHaveBeenCalledWith("1234");
    });
  });

  describe("when configured", () => {
    it("should focus the first input", () => {
      const inputs = renderComponent({ autoFocus: true });

      expect(inputs[0]).toHaveFocus();
    });

    it("should allow accept string as regex pattern", async () => {
      const inputs = renderComponent({ pattern: "^\\d" });
      await userEvent.type(screen.getAllByRole("textbox")[0]!, "w1q3");

      expect(getText(inputs)).toBe("13");
    });

    it("should mask inputs ", async () => {
      render(<VerificationCode password={true} />);

      const inputs = document.querySelectorAll("input");

      inputs.forEach((input) => {
        expect(input.getAttribute("type")).toBe("password");
      });
    });

    it("should disable all inputs", () => {
      const inputs = renderComponent({ disabled: true });

      inputs.forEach((input) => {
        expect(input).toBeDisabled();
      });
    });
  });

  describe("when value is pasted", () => {
    it("should allow paste", async () => {
      const inputs = renderComponent();

      act(() => screen.getAllByRole("textbox")[0]!.focus());

      await userEvent.paste("1234");

      expect(getText(inputs)).toBe("1234");
    });

    it("should not allow paste", async () => {
      const inputs = renderComponent({ allowPaste: false });

      act(() => screen.getAllByRole("textbox")[0]!.focus());
      await userEvent.paste("1234");

      inputs.forEach((input) => {
        expect(input).toHaveValue("");
      });
    });

    it("should keep original value is invalid", async () => {
      const inputs = renderComponent({ pattern: /^\d+$/});

      await userEvent.type(inputs[0]!, "12");
      expect(getText(inputs)).toBe("12");

      await userEvent.paste("aE");
      expect(getText(inputs)).toBe("12");
    });

    it("should paste only the first letter", async () => {
      const inputs = renderComponent();

      await userEvent.type(inputs[0]!, "123");
      expect(getText(inputs)).toBe("123");

      await userEvent.paste("456");
      expect(getText(inputs)).toBe("1234");
    });
  });

  describe("when backspace is pressed", () => {
    it("should disable current input", async () => {
      const inputs = renderComponent({ value: "12" });
      expect(inputs[2]).toBeEnabled();

      await userEvent.type(inputs[2]!, "{backspace}");

      expect(inputs[2]).toBeDisabled();
    });

    it("should remove focus from current input", async () => {
      const inputs = renderComponent({ value: "12" });

      await userEvent.type(inputs[2]!, "{backspace}");
      expect(inputs[2]).not.toHaveFocus();
    });

    it("should delete previous input value", async () => {
      const inputs = renderComponent({ value: "12" });

      await userEvent.type(inputs[2]!, "{backspace}");
      expect(inputs[1]).toHaveValue("");
    });

    it("should focus previous input", async () => {
      const inputs = renderComponent({ value: "12" });

      await userEvent.type(inputs[2]!, "{backspace}");
      expect(inputs[1]).toHaveFocus();
    });

    it("should enable previous input", async () => {
      const inputs = renderComponent({ value: "12" });
      expect(inputs[1]).toBeDisabled();

      await userEvent.type(inputs[2]!, "{backspace}");
      expect(inputs[1]).toBeEnabled();
    });

    it("should not disable last input", async () => {
      const inputs = renderComponent({ value: "1234" });
      expect(inputs[3]).toBeEnabled();

      await userEvent.type(inputs[3]!, "{backspace}");
      expect(getText(inputs)).toBe("123");
      expect(inputs[3]).toBeEnabled();
    });

    it("should not remove focus from last input", async () => {
      const inputs = renderComponent({ value: "1234" });

      await userEvent.type(inputs[3]!, "{backspace}");
      expect(getText(inputs)).toBe("123");
      expect(inputs[3]).toHaveFocus();
    });
  });
});
