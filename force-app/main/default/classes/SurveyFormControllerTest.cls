@isTest
global class SurveyFormControllerTest {
    
    @isTest static void testSurveyController() {
        
        list<Questions__c> quesList = new list<Questions__c>();
        list<Selected_Questions__c> selQuesList = new list<Selected_Questions__c>();
        
        Questions__c ques1 = new Questions__c();
        ques1.Question__c = 'Name';
        ques1.Type__c = 'Text';
        ques1.Order__c = 1;
        quesList.add(ques1);
        
        Questions__c ques2 = new Questions__c();
        ques2.Question__c = 'Product Interest?';
        ques2.Type__c = 'Checkbox';
        ques2.Order__c = 2;
        ques2.Answers__c = 'AC, TV';
        
        quesList.add(ques2);
        insert quesList;
        
        Survey__c survey = new Survey__c();
        survey.OwnerId = UserInfo.getUserId();
        insert survey;
        
        Selected_Questions__c selQues1 = new Selected_Questions__c();
        selQues1.Questions__c = quesList[0].Id;
        selQues1.Survey__c = survey.Id;
        selQuesList.add(selQues1);
        
        Selected_Questions__c selQues2 = new Selected_Questions__c();
        selQues2.Questions__c = quesList[1].Id;
        selQues2.Survey__c = survey.Id;
        selQuesList.add(selQues2);
        
        insert selQuesList;
        
        SurveyFormController surveyForm = new SurveyFormController();
        surveyForm.fetchAssignedQuestions();
        
        surveyForm.selectedQuesList[0].selectedText = 'test';
        surveyForm.selectedQuesList[1].selectedChecbox = new List<String>{'AC'};
            
        surveyForm.submitSurvey();
        
        
    }
}