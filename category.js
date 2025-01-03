const equityCategories = [
    { value: 'SEQ_LC', name: 'Large_Cap' },
    { value: 'SEQ_LMC', name: 'Large_and_Mid_Cap' },
    { value: 'SEQ_FC', name: 'Flexi_Cap' },
    { value: 'SEQ_MLC', name: 'Multi_Cap' },
    { value: 'SEQ_MC', name: 'Mid_Cap' },
    { value: 'SEQ_SC', name: 'Small_Cap' },
    { value: 'SEQ_VAL', name: 'Value' },
    { value: 'SEQ_ELSS', name: 'ELSS' },
    { value: 'SEQ_CONT', name: 'Contra' },
    { value: 'SEQ_DIVY', name: 'Dividend' },
    { value: 'SEQ_FOC', name: 'Focused' },
    { value: 'SEQ_SCTH', name: 'Sectorial' }
]

const deptCategories = [
    { value: 'SDT_LND', name: 'LongDuration' },
    { value: 'SDT_MLD', name: 'MediumToLongDuration' },
    { value: 'SDT_MD', name: 'MediumDuration' },
    { value: 'SDT_SD', name: 'ShortDuration' },
    { value: 'SDT_LWD', name: 'LowDuration' },
    { value: 'SDT_USD', name: 'UltraShortDuration' },
    { value: 'SDT_LIQ', name: 'Liquid' },
    { value: 'SDT_MM', name: 'MoneyMarket' },
    { value: 'SDT_OVNT', name: 'Overnight' },
    { value: 'SDT_DB', name: 'DynamicBond' },
    { value: 'SDT_CB', name: 'CorporateBond' },
    { value: 'SDT_CR', name: 'CreditRisk' },
    { value: 'SDT_BPSU',name: 'BankingAndPSU' },
    { value: 'SDT_FL', name: 'Floater' },
    { value: 'SDT_FMP', name: 'FMP' },
    { value: 'SDT_GL', name: 'Gilt' },
    { value: 'SDT_GL10CD', name: 'GiltWith10YearsConstantDuration' },
    
]

const hybridCategories=[
    { value: 'SHY_AH', name: 'AggressiveHybrid' },
    { value: 'SHY_BH', name: 'BalancedHybrid' },
    { value: 'SHY_CH', name: 'ConservativeHybrid' },
    { value: 'SHY_EQS', name: 'EquitySavings' },
    { value: 'SHY_AR', name: 'Arbitrage' },
    { value: 'SHY_MAA', name: 'MultiAssetAllocation' },
    { value: 'SHY_DAABA', name: 'DynamicAssetAllocationOrBalancedAdvantages' },
]
const solutionOrientedCategories =[
    { value: 'SSO_CHILD', name: 'Children' },
    { value: 'SSO_RETR', name: 'Retirement' },
]

const otherCategories =[
    { value: 'SOTH_IXETF', name: 'IndedFund' },
    { value: 'SOTH_FOFS', name: 'FoFs' },
    
]
module.exports = {equityCategories,deptCategories,hybridCategories,solutionOrientedCategories,otherCategories}