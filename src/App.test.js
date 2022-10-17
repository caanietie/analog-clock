import { render, screen } from '@testing-library/react';
import App from './App';

test("expect the container to be present", () => {
  render(<App/>);
  const container = screen.getByTestId("container");
  const clockCircle = screen.getByTestId("clockCircle");
  expect(container).toBeDefined();
  expect(container).toBeVisible();
  // expect(container).toHaveLength(2);
  expect(container).toBeInTheDocument();
  expect(container).toHaveClass("container");
  expect(container).not.toBeEmptyDOMElement();
  expect(container).toContainElement(clockCircle);
  expect(container).toBeInstanceOf(HTMLDivElement);
});

test("expects clock circle container to be present", () => {
  render (<App/>);
  const minorTicks = screen.getAllByTestId("minorTicks");
  const majorTicks = screen.getAllByTestId("majorTicks");
  const clockCircle = screen.getByTestId("clockCircle");
  expect(clockCircle).toBeDefined();
  expect(clockCircle).toBeVisible();
  // expect(clockCircle).toHaveLength(60);
  expect(clockCircle).toBeInTheDocument();
  expect(clockCircle).not.toBeEmptyDOMElement();
  expect(clockCircle).toHaveClass("clockCircle");
  minorTicks.forEach(ele => {
    expect(clockCircle).toContainElement(ele)
  });
  majorTicks.forEach(ele => {
    expect(clockCircle).toContainElement(ele)
  });
  expect(clockCircle).toBeInstanceOf(HTMLDivElement);
});

test("expects minor clock callibrations to be present", () => {
  render (<App/>);
  const minorTicks = screen.getAllByTestId("minorTicks");
  expect(minorTicks.length).toBe(48);
  minorTicks.forEach(ele => {
    expect(ele).toBeDefined();
    expect(ele).toBeVisible();
    expect(ele).toBeInTheDocument();
    expect(ele).toHaveClass("ticks");
    expect(ele).toBeEmptyDOMElement();
    expect(ele).toHaveClass("minorTicks");
    expect(ele).toBeInstanceOf(HTMLDivElement);
  })
});

test("expects major clock callibrations to be present", () => {
  render (<App/>);
  const majorTicks = screen.getAllByTestId("majorTicks");
  expect(majorTicks.length).toBe(12);
  majorTicks.forEach(ele => {
    expect(ele).toBeDefined();
    expect(ele).toBeVisible();
    expect(ele).toBeInTheDocument();
    expect(ele).toHaveClass("ticks");
    expect(ele).toBeEmptyDOMElement();
    expect(ele).toHaveClass("majorTicks");
    expect(ele).toBeInstanceOf(HTMLDivElement);
  })
});

test("expects clock text container to be present", () => {
  render (<App/>);
  const clockTextCircle = screen.getByTestId("clockTextCircle");
  const hourHand = screen.getByTestId("hourHand");
  // const clockText = screen.getByTestId("clockText");
  const secondHand = screen.getByTestId("secondHand");
  const minuteHand = screen.getByTestId("minuteHand");
  expect(clockTextCircle).toBeDefined();
  expect(clockTextCircle).toBeVisible();
  // expect(clockTextCircle).toHaveLength(15);
  expect(clockTextCircle).toBeInTheDocument();
  expect(clockTextCircle).not.toBeEmptyDOMElement();
  expect(clockTextCircle).toContainElement(hourHand);
  // expect(clockTextCircle).toContainElement(clockText);
  expect(clockTextCircle).toContainElement(secondHand);
  expect(clockTextCircle).toContainElement(minuteHand);
  expect(clockTextCircle).toHaveClass("clockTextCircle");
  expect(clockTextCircle).toBeInstanceOf(HTMLDivElement);
});

test("expects numbers to be present on clock's face", () => {
  render (<App/>);
  const clockText = screen.getAllByTestId("clockText");
  expect(clockText.length).toBe(12);
  clockText.forEach(ele => {
    expect(ele).toBeDefined();
    expect(ele).toBeVisible();
    expect(ele).toBeInTheDocument();
    expect(ele).toHaveClass("clockText");
    expect(ele).not.toBeEmptyDOMElement();
    expect(ele).toHaveTextContent(/\d{1,2}/);
    expect(ele).toBeInstanceOf(HTMLDivElement);
  })
});

test("expect hands to be present in the clock", () => {
  render(<App/>);
  const rgx = /secondHand|minuteHand|hourHand/i;
  const clockHands = screen.getAllByTestId(rgx);
  expect(clockHands.length).toBe(3);
  clockHands.forEach(ele => {
    expect(ele).toBeDefined();
    expect(ele).toBeVisible();
    // expect(ele).toHaveClass(rgx);
    expect(ele).toBeInTheDocument();
    expect(ele).toHaveClass("hands");
    expect(ele).toBeEmptyDOMElement();
    expect(ele).not.toHaveTextContent();
    expect(ele).toBeInstanceOf(HTMLDivElement);
  })
});