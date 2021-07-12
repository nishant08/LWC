public class SurveyFormController {
   
    public List<SurveyWrapper> selectedQuesList{get;set;}    

    public SurveyFormController() {
        selectedQuesList = new List<SurveyWrapper>();    
        fetchAssignedQuestions();
    }

    public List<SurveyWrapper> fetchAssignedQuestions() {

        for(Selected_Questions__c questions :  [SELECT Id, Name, Questions__r.Question__c, Questions__r.Type__c, Questions__r.Answers__c  
                                                FROM Selected_Questions__c
                                                WHERE Survey__r.OwnerId =: UserInfo.getUserId() 
                                                ORDER BY Questions__r.Order__c]){

            List<SelectOption> options = new List<SelectOption>();   
            if( questions.Questions__r.Type__c != 'Text') {
                options = getList(questions.Questions__r.Answers__c);
            } 
                                                                    
            SurveyWrapper survey = new SurveyWrapper(questions.Id, questions.Questions__r.Question__c , questions.Questions__r.Type__c, options );
            selectedQuesList.add(survey);
        }        
        return selectedQuesList;
    }

    public List<SelectOption> getList(String option) {  
        List<SelectOption> options = new List<SelectOption>();  
          for (String opt : option.split(',')) {   
            options.add(new SelectOption(opt, opt));   
          }   
        return options;   
   }

   public void submitSurvey() {
        try{
            List<Selected_Questions__c> selQuesList = new List<Selected_Questions__c>();
            set<Id> selQuesSet = new set<Id>();
            for(SurveyWrapper ques : selectedQuesList) {               
                if((ques.type == 'Radio' || ques.type == 'Text') && ques.selectedText != null && !selQuesSet.contains(ques.Id)) {
                    Selected_Questions__c selQues = new Selected_Questions__c(Id=ques.Id);
                    selQues.Selected_Answers__c = ques.selectedText;
                    selQuesList.add(selQues);
                } else if(ques.type == 'Checkbox' && !selQuesSet.contains(ques.Id) && ques.selectedChecbox.size() > 0) {
                    Selected_Questions__c selQues = new Selected_Questions__c(Id=ques.Id);
                    selQues.Selected_Answers__c = '';
                    for(String ans : ques.selectedChecbox) {
                        selQues.Selected_Answers__c = selQues.Selected_Answers__c + ans + ', ';
                    }                    
                    selQuesList.add(selQues);
                }
				selQuesSet.add(ques.Id);
            }
            if(!selQuesList.isEmpty() && selQuesList.size() > 0) {
                update selQuesList;
                ApexPages.addmessage(new ApexPages.message(ApexPages.severity.CONFIRM,'Thank you. You have successfully submitted the Survey'));
            }
            
        } catch(Exception ex ) {            
            ApexPages.Message error = new ApexPages.Message(ApexPages.Severity.FATAL,'Error');
            ApexPages.addMessage(error);
        }
                     
   }

    public class SurveyWrapper {

        public String selectedText{get;set;}
        public List<String> selectedChecbox{get;set;}
        public String ques{get;set;}
        public String type{get;set;}
        public String Id{get;set;}
        public List<SelectOption> options{get;set;}

        public SurveyWrapper(String Id, String ques, String type, List<SelectOption> options) {
            this.Id = Id;
            this.ques = ques;
            this.type = type;
            this.options = options;
            this.selectedText = '';
            this.selectedChecbox = new list<String>();
        }        
    }


}




 //@AuraEnabled(cacheable= true)
    //public static Survey__c getAssignedSurvey() {    

     //   return [SELECT Id, Name, (SELECT Id, Name, Questions__c  FROM Selected_Questions__r) FROM Survey__c WHERE OwnerId =: UserInfo.getUserId() LIMIT 1];
  //  }

    /*@AuraEnabled(cacheable=true)
    public static List<AccountContactListWrapper> getAssignedSurvey(){
        List<AccountContactListWrapper> accWrapperList = new List<AccountContactListWrapper>();
        List<Survey__c> accList = [SELECT Id, Name, 
        (SELECT Id, Name, Questions__r.Question__c, Questions__r.Type__c, Questions__r.Answers__c  FROM Selected_Questions__r ORDER BY Questions__r.Order__c) 
        FROM Survey__c WHERE OwnerId =: UserInfo.getUserId() LIMIT 1];

        if(!accList.isEmpty()){
            for(Selected_Questions__c acc : accList[0].Selected_Questions__r){
                AccountContactListWrapper accWrapper = new AccountContactListWrapper();
                accWrapper.ques = acc.Questions__r.Question__c;
                accWrapper.type = acc.Questions__r.Type__c;
                accWrapper.Id = acc.Id;                
                if(accWrapper.type != 'Text') {
                    accWrapper.options = acc.Questions__r.Answers__c;                          
                }                
                accWrapperList.add(accWrapper);
            }
        }
        return accWrapperList;
    }

    @AuraEnabled(cacheable=true)
    public static List<Selected_Questions__c> getAllQuestions() {

        List<Selected_Questions__c> surveyList = [SELECT Id, Name, Questions__r.Question__c, Questions__r.Type__c, Questions__r.Answers__c  
        FROM Selected_Questions__c
        WHERE Survey__r.OwnerId =: UserInfo.getUserId() 
        ORDER BY Questions__r.Order__c];

        return surveyList;


        
    }
      
    // wrapper class with @AuraEnabled and {get;set;} properties 
    public class AccountContactListWrapper{
        @AuraEnabled
        public String ques{get;set;}
        @AuraEnabled
        public String options{get;set;}
        @AuraEnabled
        public String type{get;set;}
        @AuraEnabled
        public String Id{get;set;}
    }*/