public class OpportunityChartCntrl {
/*@AuraEnabled(cacheable=true)
public static List<Opportunity> getOpportuznities(){
return [SELECT Amount,Name,StageName FROM Opportunity];
}


@AuraEnabled(cacheable=true)
public static Map<String, Integer> getOpportunities(){
Map<String, Integer> opportunityStatusMap = new Map<String, Integer>();
//Aggregate the opportunities. 
for(AggregateResult aggr : [SELECT Count(Id), StageName
                FROM Opportunity
                // WHERE AccountId=:accountId
                GROUP BY StageName]) {
opportunityStatusMap.put((String)(aggr.get('StageName')), (Integer)(aggr.get('expr0')));
}

return opportunityStatusMap;
}*/


@AuraEnabled(cacheable=true)
public static List<DataSet> getAllAccountsByRating(){
List<AggregateResult> result =  [Select count(Id) cnt, StageName from opportunity  group by StageName limit 10];
List<DataSet> dataSet = new List<DataSet>();
for(AggregateResult ar:result){
String status =  (String)ar.get('StageName') ;
Integer total =(Integer)ar.get('cnt');
dataSet.add(new DataSet(status ,total));
}
System.debug('dataSet'+dataSet);
return dataSet ;
}
public class DataSet{
public DataSet(String label ,Integer count){
this.label  = label ;
this.count = count ;
}
@AuraEnabled
public String label {get;set;}
@AuraEnabled
public Integer  count {get;set;}
}
}