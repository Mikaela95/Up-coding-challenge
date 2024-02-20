import { useState, useEffect } from "react";
import {
  Input,
  Label,
  Grid,
  GridRow,
  GridColumn,
  Container,
  Header,
  Message,
  Dropdown,
} from "semantic-ui-react";

function CalculateCompoundInterest() {
  const [deposit, setDeposit] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [investmentTerm, setInvestmentTerm] = useState("");
  const [interestPaid, setInterestPaid] = useState("12");
  const [interest, setInterest] = useState(0);
  const [finalBalance, setFinalBalance] = useState(0);

  const interestOptions = [
    { key: 0, text: "Monthly", value: 12 },
    { key: 1, text: "Quarterly", value: 4 },
    { key: 2, text: "Annually", value: investmentTerm * 12 },
    { key: 3, text: "At Maturity", value: 1 },
  ];

  useEffect(() => {
    const calculateInterest = () => {
      const dividedInterestRate = interestRate / 100;
      const calcBalance =
        deposit *
        Math.pow(
          1 + dividedInterestRate / interestPaid,
          interestPaid * investmentTerm
        );
      const interestEarned = calcBalance - deposit;
      setFinalBalance(Math.floor(calcBalance));
      setInterest(Math.floor(interestEarned));
    };

    calculateInterest();
  }, [deposit, interestRate, investmentTerm, interestPaid]);

  function handleChange(event, setValue) {
    const inputValue = event.target.value;

    if (!isNaN(inputValue)) {
      setValue(event.target.value);
    } else {
      alert("Invalid input")
    }
  }

  function handleDropdown(event, data) {
    setInterestPaid(data.value);
  }

  return (
    <>
      <Container style={{ padding: "2em 0em" }}>
        <Header as="h1" dividing>
          Compound Interest Calculator
        </Header>
      </Container>
      <Grid container style={{ padding: "2em 0em" }} columns={2}>
        <GridRow>
          <GridColumn>
            <Message>
              <Header as="h4">Start deposit amount: </Header>
              <Input
                labelPosition="right"
                placeholder="10 000"
                onChange={(e) => handleChange(e, setDeposit)}
                value={deposit}
              >
                <Label basic>$</Label>
                <input />
                <Label />
              </Input>
            </Message>
          </GridColumn>
          <GridColumn>
            <Message>
              <Header as="h4">Interest rate: </Header>
              <Input
                labelPosition="right"
                placeholder="1.10"
                onChange={(e) => handleChange(e, setInterestRate)}
                value={interestRate}
              >
                <input />
                <Label basic>%</Label>
              </Input>
            </Message>
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
            <Message>
              <Header as="h4">Investment term: </Header>
              <Input
                labelPosition="right"
                type="text"
                placeholder="3"
                onChange={(e) => handleChange(e, setInvestmentTerm)}
                value={investmentTerm}
              >
                <input />
                <Label basic>year(s)</Label>
              </Input>
            </Message>
          </GridColumn>
          <GridColumn>
            <Message>
              <Header as="h4">Interest paid: </Header>
              <Dropdown
                placeholder="Monthly"
                selection
                options={interestOptions}
                onChange={handleDropdown}
              />
            </Message>
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
            <Message>
              <Header as="h4">Final balance: </Header>
              <p>{`$ ${finalBalance}`}</p>
            </Message>
          </GridColumn>
          <GridColumn>
            <Message>
              <Header as="h4">Interest earned: </Header>
              <p>{`$ ${interest}`}</p>
            </Message>
          </GridColumn>
        </GridRow>
      </Grid>
    </>
  );
}

export default CalculateCompoundInterest;
